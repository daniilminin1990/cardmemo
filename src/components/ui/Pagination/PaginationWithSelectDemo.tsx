import {
  PaginationWithSelect,
  selectOptionsType,
} from '@/components/ui/Pagination/PaginationWithSelect'
// presentation
export const PaginationWithSelectDemo = () => {
  const lastPage = 10
  const maxLength = 7
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
      disabled={disabled}
      initPage={1}
      lastPage={lastPage}
      maxLength={maxLength}
      placeholder={placeholder}
      selectOptions={selectOptions}
    />
  )
}
