import { ChangeEvent, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { Card } from '@/components/pages/cardsList/card/card'
import { AddOrUpdateModal } from '@/components/pages/cardsList/modal/common/addOrUpdateModal'
import { BackBtn } from '@/components/pages/common/backBtn/backBtn'
import { Loading } from '@/components/pages/common/loading/loading'
import { CommonPagination } from '@/components/pages/common/pagination/commonPagination'
import { Decks } from '@/components/pages/decksList1/decks/decks'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import { DropDownMenu } from '@/components/ui/DropDown/DropDown.stories'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/components/utils/hooks/useNavigate'
import { searchHandler } from '@/components/utils/searchHandler'
import { useMeQuery } from '@/services/auth/auth.services'
import { useAddCardMutation, useGetCardsQuery } from '@/services/cards/cards.services'
import { useGetDeckByIdQuery } from '@/services/decks/decks.services'

import s from './cardsList.module.scss'

import groupIcon from '../../../assets/icons/more-vertical-outline.svg'
import defaltCardImg from '../../../assets/img/defaultDeckImg.jpg'

export const CardsList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isAddModal, setIsAddModal] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<'Picture' | 'Text'>('Text')
  const [answerImgPreview, setAnswerImgPreview] = useState(defaultDeckImg)
  const [questionImgPreview, setQuestionImgPreview] = useState(defaultDeckImg)

  const { goTo } = useNavigation()
  const { id } = useParams()

  const { data, isLoading } = useGetCardsQuery({
    currentPage: searchParams.get('currentPage') ?? 1,
    id: `${id}` || '',
    itemsPerPage: searchParams.get('itemsPerPage') ?? undefined,
    orderBy: searchParams.get('orderBy') ?? undefined,
    question: searchParams.get('question') ?? undefined,
  })
  const [addCard] = useAddCardMutation()
  const { data: deckData } = useGetDeckByIdQuery({ id: id || '' })
  const { data: meData } = useMeQuery()

  const currentPage = data?.pagination.currentPage ?? 0
  const itemsPerPage = data?.pagination.itemsPerPage ?? 0
  const totalItems = data?.pagination.totalItems ?? 0

  const debounceTimer = useRef(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchHandler({ debounceTimer, e, name: 'question', searchParams, setSearchParams })
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
  const goToDecksHandler = () => {
    goTo('/decks')
  }
  const goToLearnHandler = () => {
    goTo(`/cards/${id}/learn`)
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
        <BackBtn goTo={goToDecksHandler} name={'Back to Decks List'} />
        <div className={s.head}>
          <div className={s.cardInfo}>
            <Typography as={'span'} className={s.cardName} variant={'h1'}>
              {deckData?.name}
              {meData?.id === deckData?.userId && (
                <DropdownMenuDemo icon={groupIcon} type={'menu'}>
                  <DropDownItem text={'Edit'} />
                  <DropDownItem text={'Learn'} />
                  <DropDownItem text={'Delete'} />
                </DropdownMenuDemo>
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
            <Button className={s.learnBtn} onClick={goToLearnHandler}>
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
            type={'search'}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <Decks
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
