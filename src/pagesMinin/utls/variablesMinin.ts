export const headersNameDecks = [
  { key: 'name', title: 'Name' },
  { key: 'cardsCount', title: 'Cards' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'created', title: 'Created by' },
]

export const headersNameCards = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'grade', title: 'Grade' },
]

export const selectOptionPagination = [
  { text: '5', value: '5' },
  { text: '10', value: '10' },
  { text: '15', value: '15' },
  { text: '30', value: '30' },
  { text: '50', value: '50' },
]

export const initCurrentPage = '1'

// type updateSearchParamsType = {
//   currentPage?: number
//   itemsPerPage?: number
//   search?: string
//   searchParams: URLSearchParams
//   setSearchParams: (searchParams: URLSearchParams) => void
// }
// export const updateSearchParams = ({
//   currentPage,
//   itemsPerPage,
//   search,
//   searchParams,
//   setSearchParams,
// }: updateSearchParamsType) => {
//   currentPage === 1
//     ? searchParams.delete('currentPage')
//     : searchParams.set('currentPage', currentPage?.toString() ?? initCurrentPage)
//   itemsPerPage === 10
//     ? searchParams.delete('itemsPerPage')
//     : searchParams.set('itemsPerPage', itemsPerPage?.toString() ?? selectOptionPagination[0].value)
//   search === '' ? searchParams.delete('search') : searchParams.set('search', search ?? '')
//
//   setSearchParams(searchParams)
// }
