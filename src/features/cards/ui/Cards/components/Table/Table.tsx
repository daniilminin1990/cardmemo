import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { headersNameCards } from "@/common/globalVariables";
import { SingleRowCard } from "@/components/TableComponent/SingleRowCard/SingleRowCard";
import { TableComponentWithTypes } from "@/components/TableComponent/TableComponentWithTypes";
import { TableCardMobile } from "@/components/TableComponent/mobile/TableCardMobile/TableCardMobile";
import { TableHeadMobile } from "@/components/TableComponent/mobile/TableHeadMobile/TableHeadMobile";
import Typography from "@/components/ui/Typography/Typography";
import { Button } from "@/components/ui/button";
import { CardResponse, CardsListResponse } from "@/services/cards/cards.types";
import { Deck } from "@/services/decks/deck.types";

import s from "@/features/cards/ui/Cards/Cards.module.scss";
import { PaginationCard } from "@/features/cards/ui/PaginationCard/PaginationCard";
import { ModalKey, useModal } from "@/features/cards/lib/hooks/useModal";

type Props = {
  cardsData?: CardsListResponse
  conditionMessage: string
  currentData?: CardsListResponse
  deckData?: Deck
  isCardsCountZero: boolean
  isFetching: boolean
  isLoading: boolean
  isMineCards: boolean
  loadingStatus: boolean
  search: string
  setCardItem: (card: CardResponse) => void
  setIsCreateCardModal: (isCreateCardModal: boolean) => void
  setIsUpdateCardModal: (isUpdateCardModal: boolean) => void
}

export const Table = ({
  cardsData,
  conditionMessage,
  currentData,
  deckData,
  isCardsCountZero,
  isFetching,
  isLoading,
  isMineCards,
  loadingStatus,
  search,
  setCardItem,
  setIsCreateCardModal,
  setIsUpdateCardModal,
}: Props) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 860px)' })
  const { t } = useTranslation()
  const {setOpen:setIsDeleteCardModal} = useModal(ModalKey.DeleteCard)

  return (
    <>
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
          <PaginationCard cardsData={cardsData} currentData={currentData}/>
        </>
      )}
    </>
  )
}
