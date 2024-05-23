export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface DecksListResponse {
  items: Deck[]
  pagination: Pagination
}

export interface Deck {
  author: Author
  cardsCount: number
  cover?: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface Author {
  id: string
  name: string
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

export interface CreateDeckArgs {
  cover?: File | null // НО ТУТ ПО ИДЕЕ ДОЛЖЕН БЫТЬ FILE (пока для теста string)
  isPrivate?: boolean
  name: string
}

export interface GetDeckById {
  id: string
}

export type UpdateDeckArgs = { id: string } & Partial<CreateDeckArgs>

export type DeleteDeckArgs = { id: string }

export type MinMaxArgs = { max: number; min: number }
