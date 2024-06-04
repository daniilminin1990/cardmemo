import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { useQueryParams } from '@/hooks/useQueryParams'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery } from '@/services/decks/decks.service'

export const useTabsValuesParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const { currentPage, itemsPerPage, setCurrentPageQuery } = useQueryParams()

  const { data: meData } = useMeQuery()
  const { currentData, data, isFetching, isLoading } = useGetDecksQuery()
  const tabsValuesData = [
    { text: `${t('useTabsValuesParams.myDecks')}`, value: 'My Decks' },
    { text: `${t('useTabsValuesParams.allDecks')}`, value: 'All decks' },
    { text: `${t('useTabsValuesParams.favorites')}`, value: 'Favorites' },
  ]

  const [tabsValue, setTabsValue] = useState('All decks')

  const myId = meData?.id || ''
  const authorId = searchParams.get('authorId')
  const favoritedBy = searchParams.get('favoritedBy')

  useEffect(() => {
    if (authorId === myId) {
      setTabsValue('My Decks')
    }
    if (favoritedBy == myId) {
      setTabsValue('Favorites')
    }
    const maxNumberOfPages = Math.ceil((currentData?.pagination?.totalItems ?? 1) / itemsPerPage)

    if (maxNumberOfPages < currentPage) {
      setCurrentPageQuery(maxNumberOfPages)
    } else {
      setCurrentPageQuery(currentPage)
    }
  }, [authorId, favoritedBy, currentData])

  const setTabsValueQuery = (value: string) => {
    value === 'My Decks' ? searchParams.set('authorId', myId) : searchParams.delete('authorId')
    value === 'Favorites'
      ? searchParams.set('favoritedBy', myId)
      : searchParams.delete('favoritedBy')

    setSearchParams(searchParams)
    setTabsValue(value)
  }

  return {
    authorId,
    favoritedBy,
    setTabsValue,
    setTabsValueQuery,
    tabsValue,
    tabsValuesData,
  }
}
