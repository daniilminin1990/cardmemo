export interface Author {
  id: string
  name: string
}

export interface DeckProps {
  author: Author
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface Decks {
  items: DeckProps[]
  pagination: Pagination
}
export interface GetDecksArgs {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}
export interface AddDeckArgs {
  cover?: File | string
  isPrivate?: boolean
  name: string
}

export type UpdateDeckArgs = {
  id: string
} & Partial<AddDeckArgs>
