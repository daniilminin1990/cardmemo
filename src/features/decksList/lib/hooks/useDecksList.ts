import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetDecksQuery } from '@/features/decksList/api/decksApi'

export const useDecksList = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, isLoading } = useGetDecksQuery({
    authorId: searchParams.get('authorId') ?? '',
    currentPage: searchParams.get('currentPage') ?? 1,
    itemsPerPage: searchParams.get('itemsPerPage') ?? 5,
    maxCardsCount: searchParams.get('max') ?? undefined,
    minCardsCount: searchParams.get('min') ?? undefined,
    name: searchParams.get('name') ?? undefined,
    orderBy: searchParams.get('orderBy') ?? undefined,
    totalItems: searchParams.get('totalItems') ?? undefined,
  })

  const [isAddModal, setIsAddModal] = useState(false)

  const currentPage = data?.pagination.currentPage ?? 0
  const itemsPerPage = data?.pagination.itemsPerPage ?? 0
  const totalItems = data?.pagination.totalItems ?? 0

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
    currentPage,
    currentPageHandler,
    data,
    isAddModal,
    isLoading,
    itemsPerPage,
    itemsPerPageHandler,
    setIsAddModal,
    showModalAddHandler,
    totalItems,
  }
}
