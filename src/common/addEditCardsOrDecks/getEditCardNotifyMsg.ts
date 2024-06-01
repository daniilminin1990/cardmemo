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

export const getEditCardNotifyMsgForQuestion = ({
  data,
  item,
  previewQuestionImg,
}: {
  data: FormValuesAddEditCard
  item?: CardResponse
  previewQuestionImg: null | string
}) => {
  let messageQuestion = ''
  const dQuestion = data.question
  const iQuestion = item?.question
  const iQuestionImg = item?.questionImg

  const questionAndImgsCondition = dQuestion === iQuestion && previewQuestionImg === iQuestionImg

  if (questionAndImgsCondition) {
    messageQuestion += 'Question and question image are equal to previous. '
  }
  if (dQuestion === iQuestion) {
    messageQuestion += 'Question is equal to previous. '
  }
  if (previewQuestionImg === iQuestionImg) {
    messageQuestion += 'Question image is equal to previous. '
  }

  return `${messageQuestion}It is ok, just let you know 👌`
}

export const getEditCardNotifyMsgForAnswer = ({
  data,
  item,
  previewAnswerImg,
}: {
  data: FormValuesAddEditCard
  item?: CardResponse
  previewAnswerImg: null | string
}) => {
  let messageAnswer = ''
  const dAnswer = data.answer
  const iAnswer = item?.answer
  const iAnswerImg = item?.answerImg

  const answersAndImgsCondition = dAnswer === iAnswer && previewAnswerImg === iAnswerImg

  if (answersAndImgsCondition) {
    messageAnswer += 'Answer and answer image are equal to previous. '
  }
  if (dAnswer === iAnswer) {
    messageAnswer += 'Answer is equal to previous. '
  }
  if (previewAnswerImg === iAnswerImg) {
    messageAnswer += 'Answer image is equal to previous. '
  }

  return `${messageAnswer}It is ok, just let you know 👌`
}

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
