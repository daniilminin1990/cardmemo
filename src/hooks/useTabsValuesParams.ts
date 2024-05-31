import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { useMeQuery } from '@/services/auth/auth.service'

export const useTabsValuesParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()

  const { data: meData } = useMeQuery()
  const tabsValuesData = [
    { text: `${t('useTabsValuesParams.myDecks')}`, value: 'My Decks' },
    { text: `${t('useTabsValuesParams.allDecks')}`, value: 'All decks' },
  ]

  const [tabsValue, setTabsValue] = useState('All decks')

  const myId = meData?.id || ''
  const authorId = searchParams.get('authorId')

  useEffect(() => {
    if (authorId === myId) {
      setTabsValue('My Decks')
    }
  }, [authorId])

  const setTabsValueQuery = (value: string) => {
    value === 'My Decks' ? searchParams.set('authorId', myId) : searchParams.delete('authorId')
    setSearchParams(searchParams)
    setTabsValue(value)
  }

  return {
    authorId,
    setTabsValue,
    setTabsValueQuery,
    tabsValue,
    tabsValuesData,
  }
}
