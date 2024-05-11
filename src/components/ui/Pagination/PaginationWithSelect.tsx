import { useState } from 'react'

import { Pagination } from '@/components/ui/Pagination/ui/Pagination'
import SelectUI from '@/components/ui/Select/Select'
import Typography from '@/components/ui/Typography/Typography'

import s from './paginationWithSelect.module.scss'
export type selectOptionsType = {
  text: string
  value: string
}

type Props = {
  disabled?: boolean
  placeholder?: string
  selectOptions: selectOptionsType[]
}
export const PaginationWithSelect = (props: Props) => {
  const { disabled, placeholder = 'Select', selectOptions } = props
  const paginationLength = 7 // length of pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pagesInARow = 3 // acceptable count of pages in a row if there would be ellipses
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const totalItems: number = 100 // comes from API
  const totalPages: number = Math.ceil(totalItems / itemsPerPage) // Is this comes from, server???
  const itemsPerPageHandler = (count: string) => {
    setItemsPerPage(+count)
    setCurrentPage(prevState => {
      if (currentPage <= totalPages) {
        return prevState
      }

      return 1
    })
  }

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
        pagesInARow={pagesInARow}
        paginationLength={paginationLength}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <Typography className={s.firstText}>Показать </Typography>
      <SelectUI
        customStyle={'select'}
        disabled={disabled}
        itemsPerPageHandler={itemsPerPageHandler}
        placeholder={placeholder}
        selectOptions={selectOptions}
      />
      <Typography className={s.lastText}>на странице</Typography>
    </div>
  )
}
