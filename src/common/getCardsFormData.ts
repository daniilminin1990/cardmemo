import { UpdateCardArgs } from '@/services/cards/cards.types'

export const getCardsFormData = (data: UpdateCardArgs) => {
  const formData = new FormData()
  const { answer, answerImg, question, questionImg } = data

  if (answer) {
    formData.append('answer', answer)
  }
  if (question) {
    formData.append('question', question)
  }
  if (answerImg) {
    formData.append('answerImg', answerImg)
  } else if (answerImg === null) {
    formData.append('answerImg', '')
  }
  if (questionImg) {
    formData.append('questionImg', questionImg)
  } else if (questionImg === null) {
    formData.append('questionImg', '')
  }

  return formData
}
