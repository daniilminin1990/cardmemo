import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { handleToastInfo } from '@/common/consts/toastVariants'
import { DataFiller } from '@/components/ModalsForTable/ModalEditCard/DataFiller/DataFiller'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './modalEditCard.module.scss'

type ModalAddEditProps = {
  item?: CardResponse
  open: boolean
  setOpen: (value: boolean) => void
}

// const getSchema = (item?: CardResponse) => {
//   return z.object({
//     answer: z
//       .string()
//       .min(3)
//       .max(500)
//       .superRefine((val, ctx) => {
//         if (val === item?.answer) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Values are equal',
//           })
//         }
//       }),
//     question: z
//       .string()
//       .min(3)
//       .max(500)
//       .superRefine((val, ctx) => {
//         if (val === item?.question) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Values are equal',
//           })
//         }
//       }),
//   })
// }

const getSchema = () => {
  return z.object({
    answer: z.string().min(3).max(500),
    question: z.string().min(3).max(500),
  })
}

export type FormValues = z.infer<ReturnType<typeof getSchema>>

export const ModalAddEditCard = (props: ModalAddEditProps) => {
  const { item, open, setOpen } = props
  const { clearQuery } = useQueryParams()
  const [answerImg, setAnswerImg] = useState<File | null | undefined>(undefined)
  const [questionImg, setQuestionImg] = useState<File | null | undefined>(undefined)

  const deckId = useParams().deckId

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  // const schema = getSchema(item)
  const schema = getSchema()

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    let message = ''

    if (item) {
      // Проверяем, есть ли редактируемый элемент
      if (data.answer === item.answer) {
        message += 'Answer values are equal. '
      }
      if (data.question === item.question) {
        message += 'Question values are equal. '
      }
    }

    if (message) {
      handleToastInfo(message)
    }

    // После проверок, выполните запросы на создание или обновление
    if (item) {
      updateCard({
        args: {
          answer: data.answer,
          answerImg,
          question: data.question,
          questionImg,
        },
        cardId: item.id,
      })
    } else {
      createCard({
        args: { answer: data.answer, answerImg, question: data.question, questionImg },
        deckId: deckId ?? '',
      })
    }

    clearQuery()
    setOpen(false)
    setQuestionImg(undefined)
    setAnswerImg(undefined)
  }

  const getQuestionImgHandler = (img: File | null | undefined) => {
    setQuestionImg(img)
  }
  const getAnswerImgHandler = (img: File | null | undefined) => {
    setAnswerImg(img)
  }

  const handleOnClose = () => {
    setOpen(false)
  }

  return (
    <Modal
      className={s.customClass}
      onOpenChange={handleOnClose}
      open={open}
      title={item ? 'Update Card' : 'Add New Card'}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.body}>
          <DataFiller
            control={control}
            getImageHandler={getQuestionImgHandler}
            img={item?.questionImg}
            item={item}
            label={'question'}
            questionOrAnswer={item?.question}
          />
          <DataFiller
            control={control}
            getImageHandler={getAnswerImgHandler}
            img={item?.answerImg}
            item={item}
            label={'answer'}
            questionOrAnswer={item?.answer}
          />
        </div>
        <div className={s.footer}>
          <Button onClick={handleOnClose} type={'button'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            type={'submit'}
            // Не обязательное говно, т.к. по умолчанию onSubmit
          >
            <Typography variant={'subtitle2'}>{item ? 'Save changes' : 'Create Card'}</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
