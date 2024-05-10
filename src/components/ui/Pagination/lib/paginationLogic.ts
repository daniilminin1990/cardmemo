export function getPaginationItems(currentPage: number, lastPage: number, maxLength: number) {
  const res: Array<number> = []

  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      res.push(i)
    }
  }
  // handle ellipsis МНОГОТОЧИЕ logic
  else {
    const firstPage = 1
    const confirmedPagesCount = 3 // acceptable count of pages in a row if there would be ellipses
    // deducted -- how many elements should show on the sides
    const deductedMaxLength = maxLength - confirmedPagesCount // 7 - 3 = 4 // means that we need 4 elements in the array
    const sideLength = deductedMaxLength / 2 // now we know how many elements should show on the sides

    // handle 1 ellipsis in the middle
    if (currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
      for (let j = 1; j <= firstPage + sideLength; j++) {
        res.push(j)
      }
      res.push(NaN)
      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        res.push(k)
      }
    }

    // handle 2 ellipsis on both sides
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1

      res.push(1)
      res.push(NaN)
      for (let l = currentPage - deductedSideLength; l <= currentPage + deductedSideLength; l++) {
        res.push(l)
      }
      res.push(NaN)
      res.push(lastPage)
    }

    // handle 1 ellipsis in the beginning or in the end of array
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage
      let remainedLength = maxLength

      if (isNearFirstPage) {
        // generate the expected result array
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m)
          remainedLength -= 1
        }
        res.push(NaN)
        remainedLength -= 1
        for (let n = lastPage - (remainedLength - 1); n <= lastPage; n++) {
          res.push(n)
        }
      } else {
        // generate the expected result array
        for (let o = lastPage; o >= currentPage - 1; o--) {
          res.unshift(o)
          remainedLength -= 1
        }
        res.unshift(NaN)
        remainedLength -= 1

        for (let p = remainedLength; p >= 1; p--) {
          res.unshift(p)
        }
      }
    }
  }

  return res
}

// console.log(getPaginationItems(1, 5, 7)) // [1, 2, 3, 4, 5]
// console.log(getPaginationItems(5, 7, 7)) // [1, 2, 3, 4, 5, 6, 7]
// // handle ellipsis МНОГОТОЧИЕ logic
// // this case works same for currentPage = 1, 2 / lastPage = 9, 10
// console.log(getPaginationItems(1, 10, 7)) // [1, 2, 3, ..., 8, 9, 10]
// console.log(getPaginationItems(9, 10, 7)) // [1, 2, 3, ..., 8, 9, 10]
// // cases
// // currentPage = 1, firstPage = 1 | currentPage - firstPage = 0
// // currentPage = 9, lastPage = 10 | lastPage - currentPage = 1
// // currentPage = 2, firstPage = 1 | currentPage - firstPage = 1
// // currentPage = 10, lastPage = 10 | lastPage - currentPage = 0
// //? case For 2 ellipses
// console.log(getPaginationItems(5, 10, 7)) // [1, NaN, 4, 5, 6, NaN, 10]
// console.log(getPaginationItems(6, 10, 7)) // [1, NaN, 5, 6, 7, NaN, 10]
// // currentPage = 5, firstPage = 1 | currentPage - firstPage = 4
// // currentPage = 6, lastPage = 10 | lastPage - currentPage = 4
// //? case for 1 ellipsis in the begging or at the end of array
// console.log(getPaginationItems(3, 10, 7)) // [1, 2, 3, 4, 5, 6, NaN, 10]
// console.log(getPaginationItems(4, 10, 7)) // [1, 2, 3, 4, 5, NaN, 9, 10]
// console.log(getPaginationItems(7, 10, 7)) // [1, NaN, 6, 7, 8, 9, 10]
// console.log(getPaginationItems(8, 10, 7)) // [1, 2, NaN, 7, 8, 9, 10]
