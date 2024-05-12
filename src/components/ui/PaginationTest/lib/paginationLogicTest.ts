import { useMemo } from 'react'

type PaginationLogicType = {
  currentPage: number
  lastPage: number
  pagesInARow?: number
  siblingCount?: number
}

export const usePagination = ({
  currentPage,
  lastPage,
  pagesInARow = 5,
  siblingCount = 1,
}: PaginationLogicType) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(lastPage / pagesInARow)

    const totalPageNumbers = siblingCount + 5

    // case 1
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    // case 2
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, NaN, totalPageCount]
    }

    // case 3
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, NaN, ...rightRange]
    }

    // case 4
    else {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, NaN, ...middleRange, NaN, lastPageIndex]
    }
  }, [pagesInARow, lastPage, siblingCount, currentPage])
}
function range(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}
