import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { DataFiller } from '@/pagesMinin/ModalsForTable/ModalEditCard/DataFiller/DataFiller'
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

export const ModalAddEditCard = (props: ModalAddEditProps) => {
  const { item, open, setOpen } = props
  const [answerImg, setAnswerImg] = useState<File | null | undefined>(undefined)
  const [questionImg, setQuestionImg] = useState<File | null | undefined>(undefined)

  const schema = z.object({
    answer: item ? z.string() : z.string().min(3).max(1000),
    question: item ? z.string() : z.string().min(3).max(1000),
  })
  const deckId = useParams().deckId
  // const [card] = useGetCardByIdQuery({ id: deckId ?? '' })

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  type FormValues = z.infer<typeof schema>
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    // console.log({ answerImg, data: { ...data }, questionImg })
    if (item) {
      console.log('update')
      console.log('answerImg -- ', answerImg)
      updateCard({
        args: {
          answer: data.answer,
          // answerImg: answerImg || undefined,
          answerImg,
          question: data.question,
          // questionImg: questionImg || undefined,
          questionImg,
        },
        cardId: item.id,
      })
    } else {
      console.log('create')
      createCard({
        args: { answer: data.answer, answerImg, question: data.question, questionImg },
        deckId: deckId ?? '',
      })
    }
    setOpen(false)
    // setQuestionImg(null)
    // setAnswerImg(null)
    setQuestionImg(undefined)
    setAnswerImg(undefined)
  }

  const getQuestionImgHandler = (img: File | null) => {
    console.log(img)
    setQuestionImg(img)
  }
  const getAnswerImgHandler = (img: File | null) => {
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
            name={'question'}
            questionOrAnswer={item?.question}
            title={'Question'}
          />
          <DataFiller
            control={control}
            getImageHandler={getAnswerImgHandler}
            img={item?.answerImg}
            item={item}
            name={'answer'}
            questionOrAnswer={item?.answer}
            title={'Answer'}
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
