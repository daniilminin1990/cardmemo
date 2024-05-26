import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { DataFiller } from '@/pagesMinin/ModalsForTable/ModalEditCard/DataFiller/DataFiller'
import { useQueryParams } from '@/pagesMinin/utls/useQueryParams'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './modalEditCardMinin.module.scss'

import {
  useCreateCardMutation,
  useUpdateCardMutation,
} from '../../../../services/cards/cards.service'
import { Card } from '../../../../services/cards/cards.types'

type ModalAddEditProps = {
  item?: Card
  open: boolean
  setOpen: (value: boolean) => void
}

function getSchema(item?: Card) {
  return z.object({
    answer: item ? z.string() : z.string().min(3).max(500),
    question: item ? z.string() : z.string().min(3).max(500),
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

  const schema = getSchema(item)

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
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
    console.log(img)
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
