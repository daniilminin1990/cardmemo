import { useQueryParams } from '@/common/hooks/useQueryParams'
import { CardsListResponse } from '@/features/cards/api/cardsApi.types'

type Props = {
  currentData?: CardsListResponse
  currentPage: number
}

export const useItemsPerPage = ({ currentData, currentPage }: Props) => {
  const { setCurrentPageQuery, setItemsPerPageQuery } = useQueryParams()

  const handleItemsPerPageChange = (value: number) => {
    const maxNumberOfPages = Math.ceil((currentData?.pagination?.totalItems ?? 0) / value)

    if (maxNumberOfPages < currentPage) {
      setCurrentPageQuery(maxNumberOfPages)
    }
    setItemsPerPageQuery(value)
  }

  return { handleItemsPerPageChange }
}
