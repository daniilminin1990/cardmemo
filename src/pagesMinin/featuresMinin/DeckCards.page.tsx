import { ChangeEvent } from 'react'
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

import { useGetCardsQuery, useGetDeckByIdQuery } from '../../../services/flashCardsAPI'

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
  const deckId = useParams().deckId

  const { data: deck, isLoading } = useGetDeckByIdQuery({ id: deckId ?? '' })

  const { data } = useGetCardsQuery({
    args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: search },
    id: deckId ?? '',
  })

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

  if (isLoading) {
    return <h1>...Loading</h1>
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
          <div className={clsx(deck?.cover && s.isWithImage)}>
            <Typography as={'h1'} variant={'h1'}>
              ОНА ЧУЖАЯ, БРО {deck?.name}
              {/*  Тут нужно будет добавить проверку на МОИ cards или не мои  И МОИ -- ДОБАВИТЬ DropDown*/}
            </Typography>
            {deck?.cover && <img alt={'img'} src={deck?.cover} width={'200px'} />}
          </div>
          {deck?.cardsCount !== 0 && (
            <div className={s.switchButton}>
              <Button className={s.addCard} onClick={() => {}} type={'button'}>
                <Typography variant={'subtitle2'}>Add New Card</Typography>
              </Button>
            </div>
          )}
        </div>
        {deck?.cardsCount !== 0 && (
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
      {deck?.cardsCount === 0 ? (
        <div className={s.emptyContent}>
          <Typography variant={'body1'}>
            This deck is empty. Click add new card to fill this pack
          </Typography>
          <Button className={s.addCard} type={'button'}>
            <Typography variant={'subtitle2'}>Add New Card</Typography>
          </Button>
        </div>
      ) : (
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
