import { Pagination } from '@/components/ui/Pagination/ui/Pagination'
import SelectUI from '@/components/ui/Select/Select'

import s from './paginationWithSelect.module.scss'
export type selectOptionsType = {
  text: string
  value: string
}

type Props = {
  disabled?: boolean
  initPage: number
  lastPage: number
  maxLength: number
  placeholder?: string
  selectOptions: selectOptionsType[]
}
export const PaginationWithSelect = (props: Props) => {
  const {
    disabled,
    initPage,
    lastPage,
    maxLength,
    placeholder = 'Something',
    selectOptions,
  } = props

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Pagination initPage={initPage} lastPage={lastPage} maxLength={maxLength} />
      <span className={s.firstText}>Показать </span>
      <SelectUI disabled={disabled} placeholder={placeholder} selectOptions={selectOptions} />
      <span className={s.lastText}>на странице</span>
    </div>
  )
}
