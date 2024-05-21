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

export interface CardsListResponse {
  items: Card[]
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

export interface Card {
  answer: string
  answerImg?: null | string
  answerVideo?: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg?: null | string
  questionVideo?: null | string
  shots: number
  updated: string
  userId: string
}

export interface GetCardsArgs {
  answer?: string
  currentPage?: number
  itemsPerPage?: number
  orderBy?: string
  question?: string
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

export interface GetDeckId {
  id: string
}

export type UpdateDeckArgs = { id: string } & Partial<CreateDeckArgs>

export type DeleteDeckArgs = { id: string }
