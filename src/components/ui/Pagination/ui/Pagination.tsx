// type Props = {}
import SvgArrowIosBack from '@/assets/icons/svg/ArrowIosBack'
import SvgArrowIosForward from '@/assets/icons/svg/ArrowIosForward'
import { usePagination } from '@/components/ui/Pagination/lib/paginationLogic'
import { PageLink } from '@/components/ui/Pagination/ui/PageLink/PageLink'

import s from './pagination.module.scss'

type Props = {
  currentPage: number
  setCurrentPage: (currentPage: number) => void
  totalPages: number
}

export const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const pageNumbers = usePagination({
    currentPage,
    totalPages,
  })

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
        disabled={currentPage === totalPages}
        href={'#'}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <SvgArrowIosForward />
      </PageLink>
    </nav>
  )
}
