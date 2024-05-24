import { ChangeEvent, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { path } from '@/app/routing/path'
import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { BackBtn } from '@/common/components/backBtn/backBtn'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { CommonPagination } from '@/common/components/commonPagination/commonPagination'
import { CommonTable } from '@/common/components/commonTable/commonTable'
import DropdownMenuDemo from '@/common/components/dropDown/dropDown'
import DropDownItem from '@/common/components/dropDown/dropDownItem'
import Input from '@/common/components/input/input'
import { Loading } from '@/common/components/loading/loading'
import Typography from '@/common/components/typography/typography'
import { FormatItemProps } from '@/common/types/common.types'
import { searchInputDebounce } from '@/common/utils/searchInputDebounce'
import { useMeQuery } from '@/features/auth/api/authApi'
import { useAddCardMutation, useGetCardsQuery } from '@/features/cardsList/api/cardsApi'
import { AddOrUpdateModal } from '@/features/cardsList/ui/addUpdateCardModal/addUpdateCardModal'
import { useGetDeckByIdQuery } from '@/features/decksList/api/decksApi'

import s from './cardsList.module.scss'

import groupIcon from '../../../assets/icons/more-vertical-outline.svg'
import defaltCardImg from '../../../assets/img/defaultDeckImg.jpg'

export const CardsList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { id = '' } = useParams()

  const { data, isLoading } = useGetCardsQuery({
    currentPage: searchParams.get('currentPage') ?? 1,
    id: `${id}`,
    itemsPerPage: searchParams.get('itemsPerPage') ?? 5,
    orderBy: searchParams.get('orderBy') ?? undefined,
    question: searchParams.get('question') ?? undefined,
  })
  const [addCard] = useAddCardMutation()
  const { data: deckData } = useGetDeckByIdQuery({ id })
  const { data: meData } = useMeQuery()

  const [isAddModal, setIsAddModal] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<FormatItemProps>('Text')
  const [answerImgPreview, setAnswerImgPreview] = useState(defaultDeckImg)
  const [questionImgPreview, setQuestionImgPreview] = useState(defaultDeckImg)

  const currentPage = data?.pagination.currentPage ?? 0
  const itemsPerPage = data?.pagination.itemsPerPage ?? 0
  const totalItems = data?.pagination.totalItems ?? 0
  const searchInputValue = searchParams.get('question')

  const debounceTimer = useRef(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchInputDebounce({ debounceTimer, e, name: 'question', searchParams, setSearchParams })
  }

  const clearSearchFieldHandler = () => {
    searchParams.delete('question')
    setSearchParams(searchParams)
  }
  const currentPageHandler = (page: number) => {
    searchParams.set('currentPage', `${page}`)
    setSearchParams(searchParams)
  }
  const itemsPerPageHandler = (value: number) => {
    searchParams.set('itemsPerPage', `${value}`)
    setSearchParams(searchParams)
  }

  const showModalAddHandler = () => {
    setIsAddModal(true)
  }

  return (
    <>
      <AddOrUpdateModal
        answerImgPreview={answerImgPreview}
        confirmBtnName={'Add New Card'}
        id={id}
        mutationCallBack={addCard}
        open={isAddModal}
        questionImgPreview={questionImgPreview}
        selectedFormat={selectedFormat}
        setAnswerImgPreview={setAnswerImgPreview}
        setOpen={setIsAddModal}
        setQuestionImgPreview={setQuestionImgPreview}
        setSelectedFormat={setSelectedFormat}
        title={'Add Card'}
      />
      {/*<ModalAddCard id={id} open={isAddModal} setOpen={setIsAddModal} />*/}
      <section className={s.root}>
        <BackBtn name={'Back to Decks List'} path={`${path.decks}`} />
        <div className={s.head}>
          <div className={s.cardInfo}>
            <Typography as={'span'} className={s.cardName} variant={'h1'}>
              {deckData?.name}
              {meData?.id === deckData?.userId && (
                <div style={{ border: '1px solid red' }}>
                  <DropdownMenuDemo icon={groupIcon} type={'menu'}>
                    <DropDownItem text={'Edit'} />
                    <DropDownItem text={'Learn'} />
                    <DropDownItem text={'Delete'} />
                  </DropdownMenuDemo>
                </div>
              )}
            </Typography>
            <img
              alt={'card img'}
              className={s.defaltCardImg}
              src={deckData?.cover || defaltCardImg}
            />
          </div>

          {meData?.id === deckData?.userId ? (
            <Button className={s.addBtn} onClick={showModalAddHandler}>
              <Typography as={'span'} variant={'subtitle2'}>
                Add New Card
              </Typography>
            </Button>
          ) : (
            <Button as={'a'} className={s.learnBtn} href={`${path.cards}${id}/${path.learn}`}>
              <Typography as={'span'} variant={'subtitle2'}>
                Learn to Deck
              </Typography>
            </Button>
          )}
        </div>

        <div className={s.filter}>
          <Input
            callback={clearSearchFieldHandler}
            className={s.input}
            onChange={handleSearch}
            querySearch={searchInputValue}
            type={'search'}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <CommonTable
            Component={Card}
            data={data?.items}
            headersName={[
              { key: 'question', title: 'Question' },
              { key: 'answer', title: 'Answer' },
              { key: 'updated', title: 'Last Updated' },
              { key: 'grade', title: 'Grade' },
            ]}
            sortedColumn={'updated'}
          />
        )}
        <CommonPagination
          currentPage={currentPage}
          currentPageHandler={currentPageHandler}
          itemsPerPage={itemsPerPage}
          itemsPerPageHandler={itemsPerPageHandler}
          totalItems={totalItems}
        />
      </section>
    </>
  )
}
