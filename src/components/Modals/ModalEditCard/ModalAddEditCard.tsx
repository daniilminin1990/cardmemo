import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getEditCardNotifyMsg } from '@/common/addEditCardsOrDecks/getEditCardNotifyMsg'
import { base64toFile } from '@/common/base64toFile'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { FormValuesAddEditCard, schemaAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import { DataFiller } from '@/components/Modals/ModalEditCard/DataFiller/DataFiller'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { cardsActions, cardsSelectors } from '@/services/cardsSlice/cardsSlice'
import { useAppDispatch } from '@/services/store'
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
  const answerImg = useSelector(cardsSelectors.cardAnswerImg)
  const questionImg = useSelector(cardsSelectors.cardQuestionImg)
  const previewAnswerImg = useSelector(cardsSelectors.cardPreviewAnswer)
  const previewQuestionImg = useSelector(cardsSelectors.cardPreviewQuestion)
  const dispatch = useAppDispatch()

  const deckId = useParams().deckId

  const [createCard, { isLoading: isLoadingCreate }] = useCreateCardMutation()
  const [updateCard, { isLoading: isLoadingUpdate }] = useUpdateCardMutation()

  const { control, handleSubmit } = useForm<FormValuesAddEditCard>({
    defaultValues: item
      ? { answer: item.answer, question: item.question }
      : { answer: '', question: '' },
    resolver: zodResolver(schemaAddEditCard),
  })

  const onSubmit: SubmitHandler<FormValuesAddEditCard> = data => {
    if (item) {
      const msg = getEditCardNotifyMsg({
        data,
        item,
        previewAnswerImg,
        previewQuestionImg,
      })

      handleToastInfo(msg)

      updateCard({
        args: {
          answer: data.answer,
          answerImg: base64toFile(answerImg),
          question: data.question,
          questionImg: base64toFile(questionImg),
        },
        cardId: item.id,
      })
    } else {
      createCard({
        args: {
          answer: data.answer,
          answerImg: base64toFile(answerImg),
          question: data.question,
          questionImg: base64toFile(questionImg),
        },
        deckId: deckId ?? '',
      })
    }

    clearQuery()
    setOpen(false)
    dispatch(cardsActions.setAnswerImg({ answerImg: undefined }))
    dispatch(cardsActions.setQuestionImg({ questionImg: undefined }))
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
              img={item?.questionImg}
              item={item}
              label={t('modalAddEditCard.question')}
              questionOrAnswer={item?.question}
            />
            <DataFiller
              control={control}
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
