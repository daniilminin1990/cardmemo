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
    const formData = new FormData()

    data.questionImg && formData.append('questionImg', data.questionImg)
    data.answerImg && formData.append('answerImg', data.answerImg)
    data.questionVideo && formData.append('questionVideo', data.questionVideo)
    data.answerVideo && formData.append('answerVideo', data.answerVideo)

    formData.append('question', data.question)
    formData.append('answer', data.answer)

    mutationCallBack({
      formData,
      id: id,
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
    setValue('questionFormat', variant)
    setSelectedFormat(variant)
  }
  const questionFileInputRef = useRef<HTMLInputElement>(null)
  const uploadQuestionImgBtn = () => {
    questionFileInputRef.current?.click()
  }
  const answerFileInputRef = useRef<HTMLInputElement>(null)
  const uploadAnswerImgBtn = () => {
    answerFileInputRef.current?.click()
  }

  return {
    answerFileInputRef,
    changeAnswerImgHandler,
    changeQuestionImgHandler,
    control,
    errors,
    handleSubmit,
    hideModal,
    onSubmit,
    questionFileInputRef,
    setFormat,
    uploadAnswerImgBtn,
    uploadQuestionImgBtn,
  }
}
