import { selectOptionsType } from '@/components/ui/Pagination/PaginationWithSelect'
import SelectUI from '@/components/ui/Select/Select'

export const SelectDemo = () => {
  const placeholder = 'Select-box'
  const selectOptions: selectOptionsType[] = [
    { text: 'Apple', value: 'apple' },
    { text: 'Banana', value: 'banana' },
  ]
  const disabled = false

  return (
    <div style={{ margin: '0 auto', width: '300px' }}>
      <SelectUI disabled={disabled} placeholder={placeholder} selectOptions={selectOptions} />
    </div>
  )
}
