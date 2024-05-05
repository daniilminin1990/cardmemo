// type Props = {}
import { useState } from 'react'

import SvgArrowIosBack from '@/assets/icons/svg/ArrowIosBack'
import SvgArrowIosForward from '@/assets/icons/svg/ArrowIosForward'
import { getPaginationItems } from '@/components/ui/Pagination/lib/paginationLogic'
import { PageLink } from '@/components/ui/Pagination/ui/PageLink/PageLink'

import s from './pagination.module.scss'

type Props = {
  initPage: number
  lastPage: number
  maxLength: number
}

export const Pagination = ({ initPage, lastPage, maxLength }: Props) => {
  // State for Pagination
  const [currentPage, setCurrentPage] = useState(initPage)
  const pageNumbers = getPaginationItems(currentPage, lastPage, maxLength)

  return (
    <nav aria-label={'Pagination'} className={s.pagination}>
      <PageLink
        className={s.icon}
        disabled={currentPage === 1}
        href={'#'}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <SvgArrowIosBack />
      </PageLink>
      {pageNumbers.map((pageNum, index) => {
        return (
          <PageLink
            active={pageNum === currentPage}
            disabled={isNaN(pageNum)}
            href={'#'}
            key={index}
            onClick={() => setCurrentPage(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum.toString() : '...'}
          </PageLink>
        )
      })}
      <PageLink
        className={s.icon}
        disabled={currentPage === lastPage}
        href={'#'}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <SvgArrowIosForward />
      </PageLink>
    </nav>
  )
}
