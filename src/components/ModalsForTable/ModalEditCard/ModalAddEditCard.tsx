import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { FormValuesAddEditCard, schemaAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import { DataFiller } from '@/components/ModalsForTable/ModalEditCard/DataFiller/DataFiller'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { cardsSelectors, cardsSlice } from '@/services/cardsSlice/cardsSlice'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './modalEditCard.module.scss'

type ModalAddEditProps = {
  item?: CardResponse
  open: boolean
  setOpen: (value: boolean) => void
}

export const ModalAddEditCard = (props: ModalAddEditProps) => {
  const { item, open, setOpen } = props
  const { clearQuery } = useQueryParams()
  const [answerImg, setAnswerImg] = useState<File | null | undefined>(undefined)
  const [questionImg, setQuestionImg] = useState<File | null | undefined>(undefined)
  const aImg = useSelector(cardsSelectors.cardAnswerImg)
  const qImg = useSelector(cardsSelectors.cardQuestionImg)
  const aPreImg = useSelector(cardsSelectors.cardPreviewAnswer)
  const qPreImg = useSelector(cardsSelectors.cardPreviewQuestion)

  console.log({ aPreImg, qPreImg })
  console.log({ aImg, qImg })

  const deckId = useParams().deckId

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const { control, handleSubmit } = useForm<FormValuesAddEditCard>({
    defaultValues: item
      ? { answer: item.answer, question: item.question }
      : { answer: '', question: '' },
    resolver: zodResolver(schemaAddEditCard),
  })

  const onSubmit: SubmitHandler<FormValuesAddEditCard> = data => {
    if (item) {
      //? Не хватает стейта preview для answer и question (СДЕЛАТЬ ЧЕРЕЗ RTK state)
      // const msg = getEditCardNotifyMsg({
      //   data,
      //   item,
      //   previewAnswerImg: answerImg,
      //   previewQuestionImg: questionImg,
      // })

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
