import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { handleToastWarning } from '@/common/consts/toastVariants'
import { LearnCardFormValues } from '@/common/zodSchemas/cards/cards.schemas'
import { path } from '@/router/path'
import {
  useGetRandomCardByIdQuery,
  useUpdateCardGradeMutation,
} from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

import s from '@/features/learn/ui/LearnPage.module.scss'

export const useLearnPage = () => {
  const { setValue } = useForm<LearnCardFormValues>({
    defaultValues: { grade: null },
  })

  const { t } = useTranslation()
  const { deckId = '' } = useParams()

  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const { data: deckData } = useGetDeckByIdQuery({ id: deckId })
  const { data: randomCard } = useGetRandomCardByIdQuery({
    id: deckId,
  })

  const [updateCardGrade] = useUpdateCardGradeMutation()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    randomCard?.id &&
      (await updateCardGrade({ cardId: randomCard.id, grade: Number(data.grade) })
        .unwrap()
        .then(() => {
          setIsShowAnswer(false)
          setValue('grade', null)
        })
        .catch(() => {
          data.grade === null &&
            handleToastWarning(`${t(`successApiResponse.commonInfo.setGrade`)}`)
        }))
  }

  const showAnswerHandler = () => {
    setIsShowAnswer(true)
  }

  const nextAnimation = !isShowAnswer ? s.animNext : ''
  const backToCardsPage = `${path.decks}/${deckId}`

  return {
    backToCardsPage,
    deckData,
    isShowAnswer,
    nextAnimation,
    onSubmit,
    randomCard,
    showAnswerHandler,
    t,
  }
}
