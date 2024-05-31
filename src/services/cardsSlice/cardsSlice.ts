import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  answerImg: undefined as File | null | undefined,
  previewAnswer: '' as null | string,
  previewQuestion: '' as null | string,
  questionImg: undefined as File | null | undefined,
}

export const cardsSlice = createSlice({
  initialState,
  name: 'cards',
  reducers: {
    setAnswerImg: (state, action: PayloadAction<{ answerImg: File | null | undefined }>) => {
      state.answerImg = action.payload.answerImg
    },
    setPreviewAnswer: (state, action: PayloadAction<{ previewAnswer: null | string }>) => {
      state.previewAnswer = action.payload.previewAnswer
    },
    setPreviewQuestion: (state, action: PayloadAction<{ previewQuestion: null | string }>) => {
      state.previewQuestion = action.payload.previewQuestion
    },
    setQuestionImg: (state, action: PayloadAction<{ questionImg: File | null | undefined }>) => {
      state.questionImg = action.payload.questionImg
    },
  },
  selectors: {
    cardAnswerImg: state => state.answerImg,
    cardPreviewAnswer: state => state.previewAnswer,
    cardPreviewQuestion: state => state.previewQuestion,
    cardQuestionImg: state => state.questionImg,
  },
})

export const cardsActions = cardsSlice.actions
export const cardsSelectors = cardsSlice.selectors
