import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router-dom'

import { selectTheme } from '@/app/model'
import { path } from '@/app/router/path'
import { useAppSelector } from '@/app/store/store'
import {
  headersNameDecks,
  initCurrentPage,
  selectOptionPagination,
  tabsValuesData,
} from '@/common/consts/globalVariables'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { useSliderQueryParams } from '@/common/hooks/useSliderQueryParams'
import { useTabsValuesParams } from '@/common/hooks/useTabsValuesParams'
import l from '@/common/locales/LangPathVariables'
import { Deck } from '@/services/decks/deck.types'
import {
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetFavoritesDecksCountQuery,
} from '@/services/decks/decks.service'

import { router } from '../../../../app/router/router'

export function useDecks() {
  const { t } = useTranslation()
  const [run, setRun] = useState(false)
  const theme = useAppSelector(selectTheme)
  const {
    clearQuery,
    currentOrderBy,
    currentPage,
    debouncedSearchValue,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
  } = useQueryParams()

  const {
    changeMinMaxHandler,
    debouncedEndValue,
    debouncedStartValue,
    minMaxData,
    sliderMax,
    sliderMin,
  } = useSliderQueryParams()

  const { authorId, favoritedBy, setTabsValue, setTabsValueQuery, tabsValue } =
    useTabsValuesParams()
  const [deleteDeck] = useDeleteDeckMutation()
  const { currentData, data, isFetching, isLoading } = useGetDecksQuery({
    authorId: authorId || '',
    currentPage,
    favoritedBy: favoritedBy || '',
    itemsPerPage,
    maxCardsCount: debouncedEndValue,
    minCardsCount: debouncedStartValue,
    name: debouncedSearchValue,
    orderBy: currentOrderBy,
  })
  const { data: favoriteCounts } = useGetFavoritesDecksCountQuery()

  useEffect(() => {
    if (currentData) {
      const maxNumberOfPages = Math.ceil((currentData.pagination.totalItems ?? 0) / itemsPerPage)

      if (maxNumberOfPages < currentPage && maxNumberOfPages !== 0) {
        setCurrentPageQuery(maxNumberOfPages)
      }
      if (currentData?.items.length === 0) {
        setCurrentPageQuery(Number(initCurrentPage))
      }
    }
  }, [currentData, itemsPerPage, currentPage])

  const { deckId } = useParams()

  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [deckItem, setDeckItem] = useState<Deck>()

  const onDeleteDeckHandler = () => {
    deleteDeck({ id: deckItem?.id ?? '' })
    setIsDeleteModal(true)
    if (deckId) {
      router.navigate(path.decks)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  const handleTabsSwitch = (value: string) => {
    setTabsValueQuery(value)
    setTabsValue(value)
  }

  const onClearFilter = () => {
    setTabsValue(tabsValuesData[1].locale)
    clearQuery()
    handleToastInfo(`${t(l.successApiResponse.commonInfo.clearFilters)}`, 2000)
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPageQuery(value)
  }

  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  const decksData = currentData?.items ?? data?.items
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 860px)' })

  return {
    changeMinMaxHandler,
    currentPage,
    data,
    deckItem,
    decksData,
    favoriteCounts,
    handleCurrentPageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    handleTabsSwitch,
    headersNameDecks,
    isCreateModal,
    isDeleteModal,
    isFetching,
    isLoading,
    isTabletOrMobile,
    isUpdateModal,
    itemsPerPage,
    minMaxData,
    onClearFilter,
    onDeleteDeckHandler,
    run,
    search,
    selectOptionPagination,
    setDeckItem,
    setIsCreateModal,
    setIsDeleteModal,
    setIsUpdateModal,
    setRun,
    setSearchQuery,
    sliderMax,
    sliderMin,
    t,
    tabsValue,
    theme,
  }
}
