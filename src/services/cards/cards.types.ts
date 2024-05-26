import { Pagination } from '../decks/deck.types'

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

export type CreateCard = Omit<Card, 'grade'>

export type CreateCardArgs = {
  answer: string
  answerImg?: File | null
  answerVideo?: File | null
  // id: string, // deckId
  question: string
  questionImg?: File | null
  questionVideo?: File | null
}

export interface CardsListResponse {
  items: Card[]
  pagination: Pagination
}

export type UpdateCardArgs = Partial<CreateCardArgs>

export type DeleteCardArgs = { id: string }
