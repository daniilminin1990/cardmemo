import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router-dom'

import { HeadingOfPage } from '@/Pages/CardsPage/HeadingSecondRow/HeadingOfPage'
import { headersNameCards, selectOptionPagination } from '@/common/globalVariables'
import { ModalAddEditDeck } from '@/components/Modals/ModalAddEditDeck/ModalAddEditDeck'
import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import { ModalAddEditCard } from '@/components/Modals/ModalEditCard/ModalAddEditCard'
import ModalOnEmpty from '@/components/Modals/ModalOnEmpty/ModalOnEmpty'
import { SingleRowCard } from '@/components/TableComponent/SingleRowCard/SingleRowCard'
import { TableComponentWithTypes } from '@/components/TableComponent/TableComponentWithTypes'
import { TableCardMobile } from '@/components/TableComponent/mobile/TableCardMobile/TableCardMobile'
import { TableHeadMobile } from '@/components/TableComponent/mobile/TableHeadMobile/TableHeadMobile'
import Loading from '@/components/ui/Loading/Loading'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import { Page } from '@/components/ui/Page/Page'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { useQueryParams } from '@/hooks/useQueryParams'
import { path } from '@/router/path'
import { router } from '@/router/router'
import { useMeQuery } from '@/services/auth/auth.service'
import { useDeleteCardByIdMutation, useGetCardsQuery } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { useDeleteDeckMutation, useGetDeckByIdQuery } from '@/services/decks/decks.service'

import s from './cardsPage.module.scss'

export const CardsPage = () => {
  const { t } = useTranslation()
  const deckQuery = localStorage.getItem('deckQuery') ? `/${localStorage.getItem('deckQuery')}` : ''
  const {
    currentOrderBy,
    currentPage,
    debouncedSearchValue,
    itemsPerPage,
    setCurrentPageQuery,
    setItemsPerPageQuery,
  } = useQueryParams()

  const [deleteCard] = useDeleteCardByIdMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const { deckId = '' } = useParams()
  const { data: meData } = useMeQuery()
  const {
    currentData: currentDeckData,
    data: deck,
    isLoading: isDeckLoading,
  } = useGetDeckByIdQuery({ id: deckId })

  const { currentData, data, isFetching, isLoading } = useGetCardsQuery({
    args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
    id: deckId ?? '',
  })
  const [cardItem, setCardItem] = useState<CardResponse>()
  const [isEmptyModal, setIsEmptyModal] = useState(false) // Переход назад с пустой таблицей
  const [isUpdateDeckModal, setIsUpdateDeckModal] = useState(false) // Изменение Deck
  const [isDeleteDeckModal, setIsDeleteDeckModal] = useState(false) // Удаление Deck
  const [isCreateCardModal, setIsCreateCardModal] = useState(false) // Добавление Card | Переход в Learn?
  const [isUpdateCardModal, setIsUpdateCardModal] = useState(false) // Изменение Card | Переход в Learn
  const [isDeleteCardModal, setIsDeleteCardModal] = useState(false) // Удаление Card

  const handleItemsPerPageChange = (value: number) => {
    // setCurrentPageQuery(Number(initCurrentPage))
    const maxNumberOfPages = Math.ceil((currentData?.pagination?.totalItems ?? 0) / value)

    if (maxNumberOfPages < currentPage) {
      setCurrentPageQuery(maxNumberOfPages)
    }
    setItemsPerPageQuery(value)
  }

  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  const onDeleteDeckHandler = () => {
    deleteDeck({ id: deckId })
    setIsDeleteDeckModal(true)
    if (deckId) {
      router.navigate(`${path.decks}${deckQuery}`)
    }
  }
  const onDeleteCardHandler = () => {
    deleteCard({ id: cardItem?.id ?? '' })
  }

  const cardsData = currentData ?? data

  const isCardsCountZero = currentData?.items.length === 0

  const isMineCards = currentDeckData?.userId === meData?.id

  const loadingStatus = isFetching || isDeckLoading

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })

  if (isLoading) {
    return <Loading type={'pageLoader'} />
  }

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Page className={s.common} mt={'24px'}>
        <ModalOnEmpty open={isEmptyModal} setIsOpenModal={setIsEmptyModal} />
        <ModalAddEditDeck
          item={currentDeckData}
          open={isUpdateDeckModal}
          setOpen={setIsUpdateDeckModal}
        />
        <ModalAddEditCard item={cardItem} open={isUpdateCardModal} setOpen={setIsUpdateCardModal} />
        <ModalAddEditCard open={isCreateCardModal} setOpen={setIsCreateCardModal} />
        <DeleteModal
          deleteFn={onDeleteDeckHandler}
          open={isDeleteDeckModal}
          setOpen={setIsDeleteDeckModal}
          title={t('cardsPage.deleteDeck')}
        >
          <Typography variant={'h1'}>{deck?.name}</Typography>
          <Typography variant={'body1'}>{t('cardsPage.isDeleteDeck')}</Typography>
        </DeleteModal>
        <DeleteModal
          deleteFn={onDeleteCardHandler}
          open={isDeleteCardModal}
          setOpen={setIsDeleteCardModal}
          title={t('cardsPage.deleteCard')}
        >
          <Typography variant={'h1'}>{cardItem?.question}</Typography>
          <Typography variant={'body1'}>{t('cardsPage.isDeleteCard')}</Typography>
        </DeleteModal>
        <HeadingOfPage
          deck={deck}
          deckId={deckId}
          isCardsCountZero={isCardsCountZero}
          isMineCards={isMineCards}
          openCreateCardModalHandler={setIsCreateCardModal}
          openDeleteDeckModalHandler={setIsDeleteDeckModal}
          openEditDeckModalHandler={setIsUpdateDeckModal}
          openEmptyDeckModalHandler={setIsEmptyModal}
        />
        {isCardsCountZero ? (
          <div className={s.emptyContent}>
            <Typography variant={'body1'}>
              {isMineCards
                ? `${t('cardsPage.emptyDeck')}`
                : `${t('cardsPage.unfortunatelyEmptyDeck')}`}
            </Typography>
            {isMineCards && (
              <Button
                className={s.addCard}
                onClick={() => setIsCreateCardModal(true)}
                type={'button'}
              >
                <Typography variant={'subtitle2'}>{t('cardsPage.addNewCard')}</Typography>
              </Button>
            )}
          </div>
        ) : (
          <>
            {isTabletOrMobile ? (
              <TableHeadMobile
                data={cardsData?.items}
                isFetching={isFetching}
                isLoading={isLoading}
                tableHeader={headersNameCards}
              >
                {cardsData?.items.map(card => {
                  return (
                    <TableCardMobile
                      item={card}
                      key={card.id}
                      openDeleteModalHandler={setIsDeleteCardModal}
                      openEditModalHandler={setIsUpdateCardModal}
                      retrieveCardItem={setCardItem}
                    />
                  )
                })}
              </TableHeadMobile>
            ) : (
              <TableComponentWithTypes
                data={cardsData?.items}
                isLoading={loadingStatus}
                tableHeader={headersNameCards}
              >
                {cardsData?.items.map(card => {
                  return (
                    <SingleRowCard
                      item={card}
                      key={card.id}
                      openDeleteModalHandler={setIsDeleteCardModal}
                      openEditModalHandler={setIsUpdateCardModal}
                      retrieveCardItem={setCardItem}
                    />
                  )
                })}
              </TableComponentWithTypes>
            )}

            <div className={s.footer}>
              <PaginationWithSelect
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                selectOptions={selectOptionPagination}
                setCurrentPage={handleCurrentPageChange}
                setItemsPerPage={handleItemsPerPageChange}
                totalItems={cardsData?.pagination.totalItems || 0}
              />
            </div>
          </>
        )}
      </Page>
    </>
  )
}
