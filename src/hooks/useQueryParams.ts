import { useSearchParams } from 'react-router-dom'

import { initCurrentPage, selectOptionPagination } from '@/common/globalVariables'
import { useDebounce } from '@/hooks/useDebounce'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const itemsPerPage = Number(
    searchParams.get('itemsPerPage') ?? Number(selectOptionPagination[0].value)
  )
  const currentPage = Number(searchParams.get('currentPage') ?? Number(initCurrentPage))
  const currentPageSearchParam = searchParams.get('currentPage')
  const search = searchParams.get('search') ?? ''
  const currentOrderBy = searchParams.get('orderBy') ?? ''

  const debouncedSearchValue = useDebounce(search)

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
    // const currentOrderBy = searchParams.get('orderBy')
    let newOrderBy

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

    newOrderBy ? searchParams.set('orderBy', newOrderBy) : searchParams.delete('orderBy')
    setSearchParams(searchParams)
  }

  const clearQuery = () => {
    setSearchParams(new URLSearchParams())
  }

  return {
    clearQuery,
    currentOrderBy,
    currentPage,
    currentPageSearchParam,
    debouncedSearchValue,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSortByQuery,
  }
}
