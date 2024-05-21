import { ChangeEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { DeckCardsTableMinin } from '@/pagesMinin/DeckCardsTableMinin/DeckCardsTableMinin'
import { PageMinin } from '@/pagesMinin/componentsMinin/PageMinin/PageMinin'
import { useQueryParams } from '@/pagesMinin/useQueryParams'
import { initCurrentPage, selectOptionPagination } from '@/pagesMinin/variablesMinin'
import { clsx } from 'clsx'

import s from './addNewCardForEmpty.module.scss'

import { useGetCardsQuery } from '../../../services/flashCardsAPI'

type TripleState = {
  test: '' | 'friend' | 'mine'
}

export const DeckCardsPage = () => {
  const {
    currentOrderBy,
    currentPage,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSortByQuery,
  } = useQueryParams()

  // Когда переходим на эту страницу, то переходим по Deck ID,
  // то есть ID можем взять из URL, значит можно использовать хук useParams

  // А как мы попадем на эту страницу??? -- по Id Deck. Значит id Deck нужно передать в URL при переходе.
  const deckId = useParams()

  console.log(deckId)
  const { data } = useGetCardsQuery({
    args: { answer: search, currentPage, itemsPerPage, orderBy: currentOrderBy, question: search },
    id: deckId.toString(),
  })
  // const { data } = useGetDecksQuery()
  const [test, setTest] = useState<TripleState['test']>('')
  const [isImg, setIsImg] = useState(false)

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setItemsPerPageQuery(value)
  }
  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  const handleSort = (key: string) => {
    setSortByQuery(key)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  return (
    <PageMinin className={s.common} mt={'24px'}>
      {/*<ModalOnAddDeckMinin open={open} setOpen={setOpen} />*/}
      {/*<ModalAddEditDeck open={open} setOpen={setOpen} />*/}
      <div className={s.heading}>
        <div className={s.headingFirstRow}>
          <Typography as={Link} style={{ textDecoration: 'none' }} to={'/'} variant={'body2'}>
            <ArrowBackOutline />
            Back to Deck List
          </Typography>
        </div>
        <div className={s.headingSecondRow}>
          <div className={clsx(isImg && s.isWithImage)}>
            <Typography as={'h1'} variant={'h1'}>
              {test === '' ? 'Name Deck' : 'Friends Deck'}
            </Typography>
            {isImg && (
              <img
                alt={'img'}
                src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                width={'100px'}
              />
            )}
          </div>
          {test !== '' && (
            <div className={s.switchButton}>
              <Button
                className={s.addCard}
                onClick={() => {
                  setTest('')
                  setIsImg(false)
                }}
                type={'button'}
              >
                <Typography variant={'subtitle2'}>Add New Card</Typography>
              </Button>
            </div>
          )}
        </div>
        {test !== '' && (
          <Input
            callback={setSearchQuery}
            className={s.input}
            onChange={handleSearch}
            // querySearch={search}
            type={'search'}
            value={search}
          />
        )}
      </div>
      {test === '' && (
        <div className={s.emptyContent}>
          <Typography variant={'body1'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button
            className={s.addCard}
            onClick={() => {
              setTest('friend')
              setIsImg(true)
            }}
            type={'button'}
          >
            <Typography variant={'subtitle2'}>Add New Card</Typography>
          </Button>
        </div>
      )}
      {test !== '' && (
        <>
          <DeckCardsTableMinin
            data={data}
            handleSort={handleSort}
            searchParamsOrderBy={currentOrderBy}
          />
          <div className={s.footer}>
            <PaginationWithSelect
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              selectOptions={selectOptionPagination}
              setCurrentPage={handleCurrentPageChange}
              setItemsPerPage={handleItemsPerPageChange}
              totalItems={data?.pagination.totalItems || 0}
            />
          </div>
        </>
      )}
    </PageMinin>
  )
}
