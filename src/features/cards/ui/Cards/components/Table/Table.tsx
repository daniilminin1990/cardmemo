import { headersNameCards } from '@/common/consts/globalVariables'
import { SingleRowCard } from '@/components/TableComponent/SingleRowCard/SingleRowCard'
import { TableComponentWithTypes } from '@/components/TableComponent/TableComponentWithTypes'
import { TableCardMobile } from '@/components/TableComponent/mobile/TableCardMobile/TableCardMobile'
import { TableHeadMobile } from '@/components/TableComponent/mobile/TableHeadMobile/TableHeadMobile'
import { useTable } from '@/features/cards/lib/hooks/useTable'
import { EmptyContent } from '@/features/cards/ui/Cards/components'
import { PaginationCard } from '@/features/cards/ui/Cards/components/PaginationCard/PaginationCard'
import { CardResponse } from '@/services/cards/cards.types'

type Props = {
  deckId: string
  setCardItem: (card: CardResponse) => void
}

export const Table = ({ deckId, setCardItem }: Props) => {
  const {
    cardsData,
    conditionMessage,
    currentData,
    isCardsCountZero,
    isFetching,
    isLoading,
    isMineCards,
    isTabletOrMobile,
    loadingStatus,
    search,
    setIsCreateCardModal,
    setIsDeleteCardModal,
    setIsUpdateCardModal,
  } = useTable({ deckId })

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
