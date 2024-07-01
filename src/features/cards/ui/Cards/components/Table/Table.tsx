import { useMediaQuery } from 'react-responsive'

import { headersNameCards } from '@/common/consts/globalVariables'
import { ModalKey, useModal } from '@/common/hooks/useModal'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { SingleRowCard } from '@/components/TableComponent/SingleRowCard/SingleRowCard'
import { TableComponentWithTypes } from '@/components/TableComponent/TableComponentWithTypes'
import { TableCardMobile } from '@/components/TableComponent/mobile/TableCardMobile/TableCardMobile'
import { TableHeadMobile } from '@/components/TableComponent/mobile/TableHeadMobile/TableHeadMobile'
import { useCards } from '@/features/cards/lib/hooks/useCards'
import { EmptyContent } from '@/features/cards/ui/Cards/components'
import { PaginationCard } from '@/features/cards/ui/Cards/components/PaginationCard/PaginationCard'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

type Props = {
  deckId: string
  setCardItem: (card: CardResponse) => void
}

export const Table = ({ deckId, setCardItem }: Props) => {
  const { currentOrderBy, currentPage, debouncedSearchValue, itemsPerPage, search } =
    useQueryParams()

  const { currentData: currentDeckData, isLoading: isDeckLoading } = useGetDeckByIdQuery({
    id: deckId,
  })

  const { currentData, data, isFetching, isLoading } = useGetCardsQuery(
    {
      args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
      id: deckId ?? '',
    },
    { skip: !currentDeckData }
  )

  const { conditionMessage, isCardsCountZero, isMineCards, loadingStatus } = useCards({
    currentData,
    currentDeckData,
    isDeckLoading,
    isFetching,
  })

  const cardsData = currentData ?? data
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 860px)' })
  const { setOpen: setIsDeleteCardModal } = useModal(ModalKey.DeleteCard)
  const { setOpen: setIsUpdateCardModal } = useModal(ModalKey.EditCard)
  const { setOpen: setIsCreateCardModal } = useModal(ModalKey.AddCard)

  return (
    <>
      {isCardsCountZero ? (
        <EmptyContent
          conditionMessage={conditionMessage}
          isMineCards={isMineCards}
          search={search}
          setIsCreateCardModal={setIsCreateCardModal}
        />
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
          <PaginationCard cardsData={cardsData} currentData={currentData} />
        </>
      )}
    </>
  )
}
