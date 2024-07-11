import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import {
  defCardNotifyMsg,
  getEditCardNotifyMsgCommon,
} from '@/common/addEditCardsOrDecks/getEditCardNotifyMsg'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { FormValuesAddEditCard, schemaAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import { DataFiller } from '@/components/Modals/ModalEditCard/DataFiller/DataFiller'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { LoadingBar } from '@/components/ui/loadingBar/LoadingBar'
import { Modal } from '@/components/ui/modal/modal'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './modalEditCard.module.scss'

type ModalAddEditProps = {
  item?: CardResponse
  open: boolean
  setOpen: (value: boolean) => void
}

export const ModalAddEditCard = (props: ModalAddEditProps) => {
  const { t } = useTranslation()
  const { item, open, setOpen } = props
  const { clearQuery } = useQueryParams()

  const [answerImg, setAnswerImg] = useState<File | null | undefined>(undefined)
  const [questionImg, setQuestionImg] = useState<File | null | undefined>(undefined)
  const [previewAnswerImg, setPreviewAnswerImg] = useState<null | string>('')
  const [previewQuestionImg, setPreviewQuestionImg] = useState<null | string>('')

  const getPreviewAnswerImg = (value: null | string) => {
    setPreviewAnswerImg(value)
  }
  const getPreviewQuestionImg = (value: null | string) => {
    setPreviewQuestionImg(value)
  }
  const getAnswerImg = (value: File | null | undefined) => {
    setAnswerImg(value)
  }
  const getQuestionImg = (value: File | null | undefined) => {
    setQuestionImg(value)
  }

  const deckId = useParams().deckId

  const [createCard, { isLoading: isLoadingCreate }] = useCreateCardMutation()
  const [updateCard, { isLoading: isLoadingUpdate }] = useUpdateCardMutation()

  const { control, handleSubmit } = useForm<FormValuesAddEditCard>({
    resolver: zodResolver(schemaAddEditCard),
  })

  const onSubmit: SubmitHandler<FormValuesAddEditCard> = data => {
    if (item) {
      const msg = getEditCardNotifyMsgCommon({
        data,
        item,
        previewAnswerImg,
        previewQuestionImg,
      })

      if (msg !== defCardNotifyMsg) {
        handleToastInfo(msg)
      }

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
        args: {
          answer: data.answer,
          answerImg,
          question: data.question,
          questionImg,
        },
        deckId: deckId ?? '',
      })
    }

    clearQuery()
    setOpen(false)
    setAnswerImg(undefined)
    setQuestionImg(undefined)
  }

  const handleOnClose = () => {
    setOpen(false)
  }

  const loadingStatus = isLoadingCreate || isLoadingUpdate

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Modal
        className={s.customClass}
        onOpenChange={handleOnClose}
        open={open}
        title={item ? `${t('modalAddEditCard.updateCard')}` : `${t('modalAddEditCard.addNewCard')}`}
      >
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.body}>
            <DataFiller
              control={control}
              getCoverHandler={getQuestionImg}
              getPreviewHandler={getPreviewQuestionImg}
              img={item?.questionImg}
              item={item}
              label={t('modalAddEditCard.question')}
              questionOrAnswer={item?.question}
            />
            <DataFiller
              control={control}
              getCoverHandler={getAnswerImg}
              getPreviewHandler={getPreviewAnswerImg}
              img={item?.answerImg}
              item={item}
              label={t('modalAddEditCard.answer')}
              questionOrAnswer={item?.answer}
            />
          </div>
          <div className={s.footer}>
            <Button onClick={handleOnClose} type={'button'} variant={'secondary'}>
              <Typography variant={'subtitle2'}>{t('modalAddEditCard.cancel')}</Typography>
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              <Typography variant={'subtitle2'}>
                {item
                  ? `${t('modalAddEditCard.saveChanges')}`
                  : `${t('modalAddEditCard.createCard')}`}
              </Typography>
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
