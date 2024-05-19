export interface Card {
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

export type CardWithGrade = {
  grade: number
} & Card

export interface CreateCardRequest {
  formData: {
    answer: string
    answerImg?: string
    answerVideo?: string
    question: string
    questionImg?: string
    questionVideo?: string
  }
  id: string
}

export interface SaveGradeRequest {
  cardId: string
  grade: number
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface PaginatedCardsWithGrade {
  items: CardWithGrade[]
  pagination: Pagination
}
//сделать id обязательным
export type UpdateCardRequest = {
  id: string
} & Partial<Omit<CreateCardRequest, 'id'>>

export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}
