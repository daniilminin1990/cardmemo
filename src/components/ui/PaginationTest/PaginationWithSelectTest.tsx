import { PaginationTest } from '@/components/ui/PaginationTest/ui/PaginationTest'
import SelectUI from '@/components/ui/Select/Select'

import s from './paginationWithSelectTest.module.scss'
export type selectOptionsType = {
  text: string
  value: string
}

type Props = {
  currentPage: number
  disabled?: boolean
  lastPage: number
  pagesInARow: number
  placeholder?: string
  selectOptions: selectOptionsType[]
  setCurrentPage: (page: number) => void
  siblingCount?: number
}
export const PaginationWithSelectTest = (props: Props) => {
  const {
    currentPage,
    disabled,
    lastPage,
    pagesInARow,
    placeholder = 'Select',
    selectOptions,
    setCurrentPage,
    siblingCount,
  } = props

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <PaginationTest
        currentPage={currentPage}
        lastPage={lastPage}
        pagesInARow={pagesInARow}
        setCurrentPage={setCurrentPage}
        siblingCount={siblingCount}
      />
      <span className={s.firstText}>Показать </span>
      <SelectUI
        className={'select'}
        disabled={disabled}
        placeholder={placeholder}
        selectOptions={selectOptions}
      />
      <div className={s.lastText}>на странице</div>
    </div>
  )
}
