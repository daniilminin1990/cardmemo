import { useSearchParams } from 'react-router-dom'

import { initCurrentPage, selectOptionPagination } from '@/pagesMinin/utls/variablesMinin'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const itemsPerPage = Number(
    searchParams.get('itemsPerPage') ?? Number(selectOptionPagination[0].value)
  )
  const currentPage = Number(searchParams.get('currentPage') ?? Number(initCurrentPage))
  const search = searchParams.get('search') ?? ''
  const currentOrderBy = searchParams.get('orderBy') ?? ''
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
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSortByQuery,
  }
}
