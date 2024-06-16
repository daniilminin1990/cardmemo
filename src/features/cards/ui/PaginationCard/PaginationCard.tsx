import { selectOptionPagination } from '@/common/globalVariables'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import { CardsListResponse } from '@/features/cards/api/cardsApi.types'
import { useItemsPerPage } from '@/features/cards/lib/hooks/useItemsPerPage'
import { useQueryParams } from '@/hooks/useQueryParams'

type Props = {
  cardsData?: CardsListResponse
  currentData?: CardsListResponse
}

export const PaginationCard = ({ cardsData, currentData }: Props) => {
  const { currentPage, itemsPerPage, setCurrentPageQuery } = useQueryParams()

  const { handleItemsPerPageChange } = useItemsPerPage({ currentData, currentPage })

  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  return (
    <>
      <PaginationWithSelect
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        selectOptions={selectOptionPagination}
        setCurrentPage={handleCurrentPageChange}
        setItemsPerPage={handleItemsPerPageChange}
        totalItems={cardsData?.pagination.totalItems || 0}
      />
    </>
  )
}
