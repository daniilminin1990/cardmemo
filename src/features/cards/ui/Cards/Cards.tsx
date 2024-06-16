import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router-dom'

import { HeadingOfPage } from '@/Pages/CardsPage/HeadingSecondRow/HeadingOfPage'
import { headersNameCards } from '@/common/globalVariables'
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
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { useCards } from '@/features/cards/lib/hooks/useCards'
import { DeleteCard } from '@/features/cards/ui/DeleteCard/DeleteCard'
import { DeleteDeck } from '@/features/cards/ui/DeleteDeck/DeleteDeck'
import { PaginationCard } from '@/features/cards/ui/PaginationCard/PaginationCard'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

import s from './Cards.module.scss'

export const Cards = () => {
  const { t } = useTranslation()
  const { currentOrderBy, currentPage, debouncedSearchValue, itemsPerPage, search } =
    useQueryParams()

  const { deckId = '' } = useParams()

  const {
    currentData: currentDeckData,
    data: deckData,
    isFetching: isDeckFetching,
    isLoading: isDeckLoading,
  } = useGetDeckByIdQuery({ id: deckId })

  const { currentData, data, isFetching, isLoading } = useGetCardsQuery(
    {
      args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
      id: deckId ?? '',
    },
    { skip: !currentDeckData }
  )

  const [cardItem, setCardItem] = useState<CardResponse>()
  const [isEmptyModal, setIsEmptyModal] = useState(false) // Переход назад с пустой таблицей
  const [isUpdateDeckModal, setIsUpdateDeckModal] = useState(false) // Изменение Deck
  const [isDeleteDeckModal, setIsDeleteDeckModal] = useState(false) // Удаление Deck
  const [isCreateCardModal, setIsCreateCardModal] = useState(false) // Добавление Card | Переход в Learn?
  const [isUpdateCardModal, setIsUpdateCardModal] = useState(false) // Изменение Card | Переход в Learn
  const [isDeleteCardModal, setIsDeleteCardModal] = useState(false) // Удаление Card

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 860px)' })

  const cardsData = currentData ?? data

  const { conditionMessage, isCardsCountZero, isMineCards, loadingStatus } = useCards({
    currentData,
    currentDeckData,
    isDeckLoading,
    isFetching,
  })

  if (isLoading || isDeckLoading || isDeckFetching) {
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
        <DeleteDeck
          deckData={deckData}
          deckId={deckId}
          isDeleteDeckModal={isDeleteDeckModal}
          setIsDeleteDeckModal={setIsDeleteCardModal}
        />
        <DeleteCard
          cardItem={cardItem}
          isDeleteCardModal={isDeleteCardModal}
          setIsDeleteCardModal={setIsDeleteCardModal}
        />
        <HeadingOfPage
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
            <Typography variant={'body1'}>{conditionMessage}</Typography>
            {search === '' &&
              isMineCards &&
              deckData?.cardsCount === 0 &&
              currentData?.items.length === 0 && (
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
                isMineCards={isMineCards}
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
              <PaginationCard cardsData={cardsData} currentData={cardsData} />
            </div>
          </>
        )}
      </Page>
    </>
  )
}
