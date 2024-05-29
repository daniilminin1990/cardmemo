import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { useMeQuery } from '@/services/auth/auth.service'

export const useTabsValuesParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: meData } = useMeQuery()
  const { t } = useTranslation()
  const tabsValuesData = [
    { text: `${t('useTabsValuesParams.myDecks')}`, value: meData?.id ?? '' },
    { text: `${t('useTabsValuesParams.allDecks')}`, value: 'All decks' },
  ]
  const authorId = searchParams.get('authorId')
  const setTabsValueQuery = (value: string) => {
    value === tabsValuesData[0].value
      ? searchParams.set('authorId', value ?? tabsValuesData[1].value)
      : searchParams.delete('authorId')
    setSearchParams(searchParams)
  }
  const [tabsValue, setTabsValue] = useState(tabsValuesData[1].value)

  return {
    authorId,
    setTabsValue,
    setTabsValueQuery,
    tabsValue,
    tabsValuesData,
  }
}
