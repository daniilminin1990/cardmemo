import { selectOptionPagination } from '@/common/consts/globalVariables'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import { CardsListResponse } from '@/features/cards/api/cardsApi.types'
import { useItemsPerPage } from '@/features/cards/lib/hooks/useItemsPerPage'

import s from '@/features/cards/ui/Cards/CardsPage.module.scss'

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
  )
}
