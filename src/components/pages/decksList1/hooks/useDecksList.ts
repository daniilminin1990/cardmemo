import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { searchHandler } from '@/components/utils/searchHandler'
import { useGetDecksQuery } from '@/services/decks/decks.services'

export const useDecksList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('All Cards')
  const [isAddModal, setIsAddModal] = useState(false)

  const { data, isLoading } = useGetDecksQuery({
    authorId: searchParams.get('authorId') ?? '',
    currentPage: searchParams.get('currentPage') ?? 1,
    itemsPerPage: searchParams.get('itemsPerPage') ?? 5,
    name: searchParams.get('name') ?? undefined,
    orderBy: searchParams.get('orderBy') ?? undefined,
    totalItems: searchParams.get('totalItems') ?? undefined,
  })

  // Сейчас authorId - undefined
  // myId - заглушка до Auth
  const myId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const authorId = searchParams.get('authorId')
  const currentPage = data?.pagination.currentPage ?? 0
  const itemsPerPage = data?.pagination.itemsPerPage ?? 0
  const totalItems = data?.pagination.totalItems ?? 0

  useEffect(() => {
    if (authorId) {
      setActiveTab('MyCards')
    }
  }, [authorId])

  const debounceTimer = useRef(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchHandler({ debounceTimer, e, name: 'name', searchParams, setSearchParams })
  }

  const clearFilterHandler = () => {
    setSearchParams(new URLSearchParams())
    setActiveTab('All Cards')
  }

  const clearSearchFieldHandler = () => {
    searchParams.delete('name')
    setSearchParams(searchParams)
  }
  const changeTabHandler = (value: string) => {
    value === 'MyCards' ? searchParams.set('authorId', myId) : searchParams.delete('authorId')

    searchParams.set('currentPage', '1')
    setSearchParams(searchParams)
    setActiveTab(value)
  }

  const showModalAddHandler = () => {
    setIsAddModal(true)
  }
  const currentPageHandler = (page: number) => {
    searchParams.set('currentPage', `${page}`)
    setSearchParams(searchParams)
  }
  const itemsPerPageHandler = (value: number) => {
    searchParams.set('itemsPerPage', `${value}`)
    setSearchParams(searchParams)
  }

  return {
    activeTab,
    changeTabHandler,
    clearFilterHandler,
    clearSearchFieldHandler,
    currentPage,
    currentPageHandler,
    data,
    handleSearch,
    isAddModal,
    isLoading,
    itemsPerPage,
    itemsPerPageHandler,
    setIsAddModal,
    showModalAddHandler,
    totalItems,
  }
}
