// type Props = {}
import { useMemo } from 'react'

import SvgArrowIosBack from '@/assets/icons/svg/ArrowIosBack'
import SvgArrowIosForward from '@/assets/icons/svg/ArrowIosForward'
import { getPaginationItems } from '@/components/ui/Pagination/lib/paginationLogic'
import { PageLink } from '@/components/ui/Pagination/ui/PageLink/PageLink'

import s from './pagination.module.scss'

type Props = {
  currentPage: number
  lastPage: number
  paginationLength: number
  setCurrentPage: (currentPage: number) => void
}

export const Pagination = ({ currentPage, lastPage, paginationLength, setCurrentPage }: Props) => {
  // State for Pagination
  const pageNumbers = useMemo(() => {
    return getPaginationItems(currentPage, lastPage, paginationLength)
  }, [currentPage, lastPage, paginationLength])

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
