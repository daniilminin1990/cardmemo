import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Typography from '@/components/ui/Typography/Typography'
import { GradeForm } from '@/features/learn/ui/gradeForm/GradeForm'
import { CardWithGradeResponse } from '@/services/cards/cards.types'

import s from './AnswerBlock.module.scss'

type Props = {
  onSubmit: SubmitHandler<FieldValues>
  randomCard: CardWithGradeResponse
}

export const AnswerBlock = ({ onSubmit, randomCard }: Props) => {
  const { t } = useTranslation()

  const isAnswerImg = randomCard.answerImg

  return (
    <>
      <Typography as={'span'} className={s.question} variant={'subtitle1'}>
        {`${t('learnPage.answer')}: `}
        <Typography as={'span'} className={s.text} variant={'body1'}>
          {randomCard.answer}
        </Typography>
      </Typography>

      {isAnswerImg && (
        <div className={s.answerCardImg}>
          <img alt={'answer card img'} src={isAnswerImg} />
          <Typography as={'span'} className={s.question} variant={'subtitle1'}>
            {`${t('learnPage.rateYourself')}: `}
          </Typography>
        </div>
      )}
      <GradeForm onSubmit={onSubmit} />
    </>
  )
}
