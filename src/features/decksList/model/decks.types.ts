export interface AuthorProps {
  id: string
  name: string
}

export interface DeckResponse {
  author: AuthorProps
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface PaginationProps {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface DecksResponse {
  items: DeckResponse[]
  pagination: PaginationProps
}

export interface GetDecksRequest {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}
export interface AddDeckRequest {
  cover?: File | string
  isPrivate?: boolean
  name: string
}

export type UpdateDeckRequest = {
  id: string
} & Partial<AddDeckRequest>

export type UpdateDeckResponse = Omit<DeckResponse, 'author'>
