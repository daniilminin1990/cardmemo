// Region Самая классная логика, НО хардкодные pagintaionLength и sideCount
// 1 вариант
import { useMemo } from 'react'

type UsePaginationArgs = {
  currentPage: number
  totalPages: number
}

export const usePagination = ({ currentPage = 1, totalPages }: UsePaginationArgs) => {
  return useMemo(() => {
    const paginationLength = 7 // максимальная длина пагинации
    const sideCount = 4 // количество страниц с обеих сторон

    //* case 1
    if (totalPages <= paginationLength) {
      return range(1, totalPages) // если общее количество страниц меньше пагинации, выводим все страницы
    }

    const firstPage = 1
    const lastPage = totalPages

    //* case 2
    // Если текущая страница на первых 4 позициях, показываем первые 5 страниц и многоточие в конце
    if (currentPage <= sideCount) {
      return [...range(1, 5), NaN, lastPage]
    }

    //* case 3
    // Если текущая страница на последних 4 позициях, показываем последние 5 страниц и многоточие в начале
    if (currentPage > totalPages - sideCount) {
      return [firstPage, NaN, ...range(totalPages - 4, totalPages)]
    }

    //* case 4
    // Если текущая страница в середине, показываем «острова» с многоточиями с обеих сторон
    return [firstPage, NaN, currentPage - 1, currentPage, currentPage + 1, NaN, lastPage]
  }, [currentPage, totalPages])
}

function range(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

// Region
// ! 2 вариант Логика с не очень приятным отображением
// import { useMemo } from 'react'
//
// type UsePaginationArgs = {
//   currentPage: number
//   totalPages: number
// }
// export const usePagination = ({
//   currentPage = 1,
//   totalPages, // 100
// }: UsePaginationArgs) => {
//   return useMemo(() => {
//     const paginationLength = 7 // length of pagination
//     const pagesInARow = 3 // acceptable count of pages in a row if there would be ellipses
//
//     if (totalPages <= paginationLength) {
//       return range(1, totalPages)
//     }
//     // case ellipsis МНОГОТОЧИЕ logic
//     else {
//       const firstPage = 1
//       // deducted -- how many elements should show on the sides
//       const deductedMaxLength = paginationLength - pagesInARow // 7 - 3 = 4 // means that we need 4 elements in the array
//       const sideLength = Math.ceil(deductedMaxLength / 2) // now we know how many elements should show on the sides
//
//       // case 1 - ellipsis in the middle
//       if (currentPage - firstPage < sideLength || totalPages - currentPage < sideLength) {
//         const leftSide = range(firstPage, sideLength + 1)
//         const rightSide = range(totalPages - sideLength, totalPages)
//
//         return [...leftSide, NaN, ...rightSide]
//       }
//
//       // case 2 - ellipsis on both sides
//       else if (
//         currentPage - firstPage >= deductedMaxLength &&
//         totalPages - currentPage >= deductedMaxLength
//       ) {
//         const deductedSideLength = sideLength - 1
//         const midArray = range(currentPage - deductedSideLength, currentPage + 1)
//
//         return [firstPage, NaN, ...midArray, NaN, totalPages]
//       }
//
//       // case 3 - ellipsis in the beginning or in the end of array
//       else {
//         return getEllipsedArray(currentPage, firstPage, totalPages, paginationLength)
//       }
//     }
//   }, [currentPage, totalPages])
// }
// function range(start: number, end: number) {
//   const length = end - start + 1
//
//   return Array.from({ length }, (_, idx) => idx + start)
// }
