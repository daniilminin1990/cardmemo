import {
  PaginationWithSelect,
  selectOptionsType,
} from '@/components/ui/Pagination/PaginationWithSelect'
// presentation
export const PaginationWithSelectDemo = () => {
  const lastPage = 10
  const paginationLength = 7
  const placeholder = '10'
  const selectOptions: selectOptionsType[] = [
    { text: '10', value: '10' },
    { text: '20', value: '20' },
    { text: '30', value: '30' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
  ]
  const disabled = false

  return (
    <PaginationWithSelect
      currentPage={1}
      disabled={disabled}
      lastPage={lastPage}
      paginationLength={paginationLength}
      placeholder={placeholder}
      selectOptions={selectOptions}
    />
  )
}
