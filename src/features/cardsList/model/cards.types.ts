export interface CardResponse {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type CardWithGradeResponse = {
  grade: GradeProps
} & CardResponse

export interface CreateCardRequest {
  answer: string
  answerImg?: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}
export type GradeProps = number

export interface SaveGradeRequest {
  cardId: string
  grade: GradeProps
}
export type GetRandomRequest = {
  id: string
  previousCardId?: string
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface PaginatedCardsWithGradeResponse {
  items: CardWithGradeResponse[]
  pagination: Pagination
}

export type UpdateCardRequest = {
  id: string
} & Partial<Omit<CreateCardRequest, 'id'>>

export type CardsRequest = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type MinMaxCardsResponse = {
  max: number
  min: number
}
