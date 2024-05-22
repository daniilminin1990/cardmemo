import { ChangeEvent, useRef } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { imageChangeHandler } from '@/components/utils/imageChange'
import { zodResolver } from '@hookform/resolvers/zod'

import { addOrUpdateCardSchema } from './addOrUpdateSchema'
type Props = {
  id: string | undefined
  mutationCallBack: any
  setAnswerImgPreview: any
  setOpen: any
  setQuestionImgPreview: any
  setSelectedFormat: any
}
export const useAddOrUpdateModal = ({
  id,
  mutationCallBack,
  setAnswerImgPreview,
  setOpen,
  setQuestionImgPreview,
  setSelectedFormat,
}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(addOrUpdateCardSchema) })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { answer, answerImg, answerVideo, question, questionImg, questionVideo } = data

    mutationCallBack({
      answer,
      answerImg: answerImg,
      answerVideo: answerVideo,
      id,
      question,
      questionImg: questionImg,
      questionVideo: questionVideo,
    })
      .unwrap()
      .then(() => {
        setOpen(false)
        setQuestionImgPreview(defaultDeckImg)
        setAnswerImgPreview(defaultDeckImg)
        reset()
      })
      .catch((error: any) => {
        console.error('Error - deck not added!', error)
      })
  }
  const hideModal = () => {
    setQuestionImgPreview(defaultDeckImg)
    setAnswerImgPreview(defaultDeckImg)
    setSelectedFormat('Text')
    setOpen(false)
    reset()
  }

  const changeQuestionImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    imageChangeHandler({
      e,
      fieldName: 'questionImg',
      setImagePreview: setQuestionImgPreview,
      setValue,
    })
  }
  const changeAnswerImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    imageChangeHandler({
      e,
      fieldName: 'answerImg',
      setImagePreview: setAnswerImgPreview,
      setValue,
    })
  }
  const setFormat = (variant: 'Picture' | 'Text') => {
    setSelectedFormat(variant)
  }
  const questionFileInputRef = useRef<HTMLInputElement>(null)
  const answerFileInputRef = useRef<HTMLInputElement>(null)
  const uploadImgBtn = (field: 'answer' | 'question') => {
    if (field === 'question') {
      questionFileInputRef.current?.click()
    }
    if (field === 'answer') {
      answerFileInputRef.current?.click()
    }
  }

  const deleteImgBtnhandler = (field: 'answer' | 'question') => {
    if (field === 'question') {
      setQuestionImgPreview(defaultDeckImg)
    }
    if (field === 'answer') {
      setAnswerImgPreview(defaultDeckImg)
    }
  }

  return {
    answerFileInputRef,
    changeAnswerImgHandler,
    changeQuestionImgHandler,
    control,
    deleteImgBtnhandler,
    errors,
    handleSubmit,
    hideModal,
    onSubmit,
    questionFileInputRef,
    setFormat,
    uploadImgBtn,
  }
}
