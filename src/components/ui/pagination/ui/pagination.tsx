// type Props = {}
import SvgArrowIosBack from '@/assets/icons/svg/ArrowIosBack'
import SvgArrowIosForward from '@/assets/icons/svg/ArrowIosForward'
import { getPaginationItems } from '@/components/ui/pagination/lib/paginationLogic'
import { PageLink } from '@/components/ui/pagination/ui/pageLink/pageLink'

import s from './pagination.module.scss'

type Props = {
  currentPage: number
  lastPage: number
  maxLength: number
  setCurrentPage: (page: number) => void
}

export const Pagination = ({ currentPage, lastPage, maxLength, setCurrentPage }: Props) => {
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
            {!isNaN(pageNum) ? pageNum : '...'}
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
