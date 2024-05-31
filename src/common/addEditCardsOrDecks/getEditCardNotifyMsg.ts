import { FormValuesAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import { CardResponse } from '@/services/cards/cards.types'

export const getEditCardNotifyMsg = ({
  data,
  item,
  previewAnswerImg,
  previewQuestionImg,
}: {
  data: FormValuesAddEditCard
  item?: CardResponse
  previewAnswerImg: null | string
  previewQuestionImg: null | string
}) => {
  let message = ''

  const answersAndImgsCondition =
    data.answer === item?.answer && previewAnswerImg === item?.answerImg
  const questionAndImgsCondition =
    data.question === item?.question && previewQuestionImg === item?.questionImg

  if (answersAndImgsCondition || questionAndImgsCondition) {
    if (answersAndImgsCondition) {
      message += 'Answer and answer image are equal to previous. '
    }
    if (questionAndImgsCondition) {
      message += 'Question and question image are equal to previous. '
    }
  } else {
    if (data.answer === item?.answer) {
      message += 'Answer is equal to previous. '
    }
    if (data.question === item?.question) {
      message += 'Question is equal to previous. '
    }
    if (previewAnswerImg === item?.answerImg) {
      message += 'Answer image is equal to previous. '
    }
    if (previewQuestionImg === item?.questionImg) {
      message += 'Question image is equal to previous. '
    }
  }

  return `${message}It is ok, just let you know 👌`
}
