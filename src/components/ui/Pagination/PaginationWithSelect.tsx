import { useState } from 'react'

import { Pagination } from '@/components/ui/Pagination/ui/Pagination'
import SelectUI from '@/components/ui/Select/Select'

import s from './paginationWithSelect.module.scss'
export type selectOptionsType = {
  text: string
  value: string
}

type Props = {
  currentPage: number
  disabled?: boolean
  lastPage: number
  paginationLength: number
  placeholder?: string
  selectOptions: selectOptionsType[]
}
export const PaginationWithSelect = (props: Props) => {
  const {
    disabled,
    lastPage,
    paginationLength,
    placeholder = 'Select',
    selectOptions,
    ...rest
  } = props

  const [currentPage, setCurrentPage] = useState(rest.currentPage)

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        paginationLength={paginationLength}
        setCurrentPage={setCurrentPage}
      />
      <span className={s.firstText}>Показать </span>
      <SelectUI
        customStyle={'select'}
        disabled={disabled}
        placeholder={placeholder}
        selectOptions={selectOptions}
      />
      <div className={s.lastText}>на странице</div>
    </div>
  )
}
