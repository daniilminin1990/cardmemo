import { FormValuesAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import { CardResponse } from '@/services/cards/cards.types'
export const getEditCardNotifyMsgCommon = ({
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
  const { answer: dAnswer, question: dQuestion } = data
  const {
    answer: iAnswer,
    answerImg: iAnswerImg,
    question: iQuestion,
    questionImg: iQuestionImg,
  } = item || {}

  const isAnswerUnchanged = dAnswer === iAnswer
  const isQuestionUnchanged = dQuestion === iQuestion
  const isAnswerImgUnchanged = previewAnswerImg === iAnswerImg
  const isQuestionImgUnchanged = previewQuestionImg === iQuestionImg

  if (isAnswerUnchanged && isQuestionUnchanged && isAnswerImgUnchanged && isQuestionImgUnchanged) {
    message = 'Data remained unchanged. '
  } else {
    if (isAnswerUnchanged) {
      message += 'Answer remained unchanged. '
    }
    if (isQuestionUnchanged) {
      message += 'Question remained unchanged. '
    }
    if (isAnswerImgUnchanged) {
      message += 'Answer image remained unchanged. '
    }
    if (isQuestionImgUnchanged) {
      message += 'Question image remained unchanged. '
    }
  }

  if (message === '') {
    message = 'Some changes were made. '
  }

  return `${message}It is ok, just let you know 👌`
}
