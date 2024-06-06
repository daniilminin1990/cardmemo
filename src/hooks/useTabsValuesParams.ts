import { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { tabsValuesData } from '@/common/globalVariables'
import { useMeQuery } from '@/services/auth/auth.service'

export const useTabsValuesParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: meData } = useMeQuery()

  const [tabsValue, setTabsValue] = useState(tabsValuesData[1].locale)

  const myId = meData?.id || ''
  const authorId = searchParams.get('authorId')
  const favoritedBy = searchParams.get('favoritedBy')

  useEffect(() => {
    if (authorId === myId) {
      setTabsValue(tabsValuesData[0].locale)
    }
    if (favoritedBy == myId) {
      setTabsValue(tabsValuesData[2].locale)
    }
  }, [authorId, favoritedBy])

  const setTabsValueQuery = (value: string) => {
    value === tabsValuesData[0].locale
      ? searchParams.set('authorId', myId)
      : searchParams.delete('authorId')
    value === tabsValuesData[2].locale
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
    // tabsValuesData,
  }
}
