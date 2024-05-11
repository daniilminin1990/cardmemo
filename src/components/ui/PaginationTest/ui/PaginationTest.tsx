import SvgArrowIosBack from '@/assets/icons/svg/ArrowIosBack'
import SvgArrowIosForward from '@/assets/icons/svg/ArrowIosForward'
import { usePagination } from '@/components/ui/PaginationTest/lib/paginationLogicTest'
import { PageLinkTest } from '@/components/ui/PaginationTest/ui/PageLinkTest/PageLinkTest'

import s from './paginationTest.module.scss'

type Props = {
  className?: string
  currentPage: number
  lastPage: number
  pagesInARow: number
  setCurrentPage: (page: number) => void
  siblingCount?: number // Количество соседей (siblingCount)
}

export const PaginationTest = ({
  currentPage,
  lastPage,
  pagesInARow,
  setCurrentPage,
  siblingCount,
}: Props) => {
  const pageNumbers = usePagination({ currentPage, lastPage, pagesInARow, siblingCount })

  // Условие если нынешняя страница = 0 или массив для пагинации < 2, верни null
  // if (currentPage === 0 || pageNumbers.length < 2) {
  //   return null
  // }

  const isLastPage = pageNumbers.findIndex(page => page === currentPage) === pageNumbers.length - 1

  return (
    <div aria-label={'Pagination'} className={s.pagination}>
      <PageLinkTest
        className={s.icon}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <SvgArrowIosBack />
      </PageLinkTest>
      {pageNumbers.map((pageNum, index) => {
        return (
          <PageLinkTest
            active={pageNum === currentPage}
            disabled={isNaN(pageNum)}
            key={index}
            onClick={() => setCurrentPage(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum.toString() : '...'}
          </PageLinkTest>
        )
      })}
      <PageLinkTest
        className={s.icon}
        disabled={isLastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <SvgArrowIosForward />
      </PageLinkTest>
    </div>
  )
}
