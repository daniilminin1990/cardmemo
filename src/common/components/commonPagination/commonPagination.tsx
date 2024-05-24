import { PaginationWithSelect } from '@/common/components/pagination/paginationWithSelect'

type Props = {
  currentPage: number
  currentPageHandler: (value: number) => void
  itemsPerPage: number
  itemsPerPageHandler: (value: number) => void
  totalItems: number
}

export const CommonPagination = ({
  currentPage,
  currentPageHandler,
  itemsPerPage,
  itemsPerPageHandler,
  totalItems,
}: Props) => {
  const selectOptions = [
    { text: '5', value: '5' },
    { text: '10', value: '10' },
    { text: '15', value: '15' },
    { text: '20', value: '20' },
    { text: '25', value: '25' },
    { text: '50', value: '50' },
  ]

  return (
    <PaginationWithSelect
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      selectOptions={selectOptions}
      setCurrentPage={currentPageHandler}
      setItemsPerPage={itemsPerPageHandler}
      totalItems={totalItems}
    />
  )
}
