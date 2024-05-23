import { useSearchParams } from 'react-router-dom'

import { initCurrentPage, selectOptionPagination } from '@/pagesMinin/utls/variablesMinin'

import { useGetMinMaxCardsCountQuery } from '../../../services/decks/decks.service'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const itemsPerPage = Number(
    searchParams.get('itemsPerPage') ?? Number(selectOptionPagination[0].value)
  )
  const { data: minMaxData } = useGetMinMaxCardsCountQuery()
  const currentPage = Number(searchParams.get('currentPage') ?? Number(initCurrentPage))
  const search = searchParams.get('search') ?? ''
  const currentOrderBy = searchParams.get('orderBy') ?? ''
  const sliderMin = Number(searchParams.get('min') ?? '')
  const sliderMax = Number(searchParams.get('max') ?? '')

  const setSliderValuesQuery = ([min, max]: number[]) => {
    min === minMaxData?.min
      ? searchParams.delete('min')
      : searchParams.set('min', min?.toString() ?? '')
    max === minMaxData?.max
      ? searchParams.delete('max')
      : searchParams.set('max', max?.toString() ?? '')
    setSearchParams(searchParams)
  }

  const setSearchQuery = (searchQuery: string) => {
    searchQuery === ''
      ? searchParams.delete('search')
      : searchParams.set('search', searchQuery ?? '')
    setSearchParams(searchParams)
  }
  const setCurrentPageQuery = (currentPageQuery: number) => {
    currentPageQuery === Number(initCurrentPage)
      ? searchParams.delete('currentPage')
      : searchParams.set('currentPage', currentPageQuery?.toString() ?? initCurrentPage)
    setSearchParams(searchParams)
  }

  const setItemsPerPageQuery = (itemsPerPageQuery: number) => {
    itemsPerPageQuery === Number(selectOptionPagination[0].value)
      ? searchParams.delete('itemsPerPage')
      : searchParams.set(
          'itemsPerPage',
          itemsPerPageQuery?.toString() ?? selectOptionPagination[0].value
        )
    setSearchParams(searchParams)
  }

  const setSortByQuery = (sortByQuery: string) => {
    const currentOrderBy = searchParams.get('orderBy')
    let newOrderBy

    // Проверяем текущее состояние и определяем новое состояние
    switch (currentOrderBy) {
      case `${sortByQuery}-asc`:
        newOrderBy = `${sortByQuery}-desc`
        break
      case `${sortByQuery}-desc`:
        newOrderBy = null
        break
      default:
        newOrderBy = `${sortByQuery}-asc`
        break
    }

    // Обновляем Query-параметр orderBy
    newOrderBy ? searchParams.set('orderBy', newOrderBy) : searchParams.delete('orderBy')
    setSearchParams(searchParams)
  }

  const clearQuery = () => {
    searchParams.delete('search')
    searchParams.delete('orderBy')
    searchParams.delete('itemsPerPage')
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  return {
    clearQuery,
    currentOrderBy,
    currentPage,
    itemsPerPage,
    minMaxData,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSliderValuesQuery,
    setSortByQuery,
    sliderMax,
    sliderMin,
  }
}

// export const useSliderQueryParams = (minMaxData: MinMaxArgs | undefined) => {
//   const [searchParams, setSearchParams] = useSearchParams()
//
//   const sliderMin = Number(searchParams.get('min') ?? '')
//   const sliderMax = Number(searchParams.get('max') ?? '')
//
//   const setSliderValuesQuery = ([min, max]: number[]) => {
//     min === minMaxData?.min
//       ? searchParams.delete('min')
//       : searchParams.set('min', min?.toString() ?? '')
//     max === minMaxData?.max
//       ? searchParams.delete('max')
//       : searchParams.set('max', max?.toString() ?? '')
//     setSearchParams(searchParams)
//   }
//
//   return {
//     setSliderValuesQuery,
//     sliderMax,
//     sliderMin,
//   }
// }
