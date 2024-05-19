import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'

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
  ]

  return (
    <PaginationWithSelect
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      placeholder={itemsPerPage.toString()}
      selectOptions={selectOptions}
      setCurrentPage={currentPageHandler}
      setItemsPerPage={itemsPerPageHandler}
      totalItems={totalItems}
    />
  )
}
