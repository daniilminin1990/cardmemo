import { UpdateCardArgs } from '@/services/cards/cards.types'
type ValueType = File | null | string | undefined
export const getCardsFormData = (data: UpdateCardArgs) => {
  const formData = new FormData()
  const { answer, answerImg, question, questionImg } = data

  const appendField = (fieldName: string, value: ValueType) => {
    if (value) {
      formData.append(fieldName, value)
    }
    if (value === null) {
      formData.append(fieldName, '')
    }
  }

  appendField('answer', answer)
  appendField('question', question)
  appendField('answerImg', answerImg)
  appendField('questionImg', questionImg)

  return formData
}
