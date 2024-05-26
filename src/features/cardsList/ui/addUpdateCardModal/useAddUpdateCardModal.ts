import { ChangeEvent, useRef } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { FormatItemProps } from '@/common/types/common.types'
import { imageChangeHandler } from '@/common/utils/imageChange'
import {
  AddUpdateCardFormValues,
  AddUpdateCardSchema,
} from '@/features/cardsList/model/cardsZod.schemes'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  id: string
  mutationCallBack: any
  setAnswerImgPreview: (file: string) => void
  setOpen: (boolean: boolean) => void
  setQuestionImgPreview: (file: string) => void
  setSelectedFormat: (format: FormatItemProps) => void
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
  } = useForm<AddUpdateCardFormValues>({ resolver: zodResolver(AddUpdateCardSchema) })

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
        toast.success(`Successfully`)
      })
      .catch(() => {
        toast.error(`Error, try again or later`)
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

  const deleteImgBtnHandler = (field: 'answer' | 'question') => {
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
    deleteImgBtnHandler,
    errors,
    handleSubmit,
    hideModal,
    onSubmit,
    questionFileInputRef,
    setFormat,
    uploadImgBtn,
  }
}
