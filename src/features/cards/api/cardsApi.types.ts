import { Pagination } from '@/services/decks/deck.types'

export interface CardResponse {
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

export type GradeProps = number
export type CardWithGradeResponse = {
  grade: GradeProps
} & CardResponse

export type GetRandomRequest = {
  id: string
  previousCardId?: string
}
export interface SaveGradeRequest {
  cardId: string
  grade: GradeProps
}
export interface GetCardsArgs {
  answer?: string
  currentPage?: number
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type CreateCard = Omit<CardResponse, 'grade'>

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
  items: CardResponse[]
  pagination: Pagination
}

export type UpdateCardArgs = Partial<CreateCardArgs>

export type DeleteCardArgs = { id: string }
