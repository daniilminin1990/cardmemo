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
  // const { currentPageSearchParam } = useQueryParams()
  //
  // totalPages = currentPageSearchParam === null ? 1 : totalPages
  const pageNumbers = usePagination({
    currentPage,
    totalPages,
  })

  return (
    <div aria-label={'Pagination'} className={s.pagination}>
      <PageLink
        className={s.icon}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <SvgArrowIosBack />
      </PageLink>
      {pageNumbers.map((pageNum, index) => {
        return (
          <PageLink
            active={pageNum === currentPage}
            disabled={isNaN(pageNum)}
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
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <SvgArrowIosForward />
      </PageLink>
    </div>
  )
}
