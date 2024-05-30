import { useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { handleToastWarning } from '@/common/consts/toastVariants'
import { LearnCardFormValues } from '@/common/zodSchemas/cards/cards.schemas'
import { BackBtn } from '@/components/ui/BackBtn/BackBtn'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Radio } from '@/components/ui/radio/radio'
import {
  useGetRandomCardByIdQuery,
  useUpdateCardGradeMutation,
} from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

import s from './learnPage.module.scss'

export const LearnPage = () => {
  const { control, handleSubmit, reset } = useForm<LearnCardFormValues>({
    defaultValues: { grade: undefined },
  })
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { deckId = '' } = useParams()

  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [previousCardId, setPreviousCardId] = useState('')

  const { data: deckData } = useGetDeckByIdQuery({ id: deckId })
  const { data: randomCard, isLoading } = useGetRandomCardByIdQuery({
    id: deckId,
    previousCardId,
  })

  const [updateCardGrade] = useUpdateCardGradeMutation()

  const gradeNames = [
    { grade: 1, name: `${t('learnPage.didtKnow')}` },
    { grade: 2, name: `${t('learnPage.forgot')}` },
    { grade: 3, name: `${t('learnPage.aLotThought')}` },
    { grade: 4, name: `${t('learnPage.confused')}` },
    { grade: 5, name: `${t('learnPage.knewAnswer')}` },
  ]

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    randomCard?.id &&
      (await updateCardGrade({ cardId: randomCard.id, grade: Number(data.grade) })
        .unwrap()
        .then(() => {
          setPreviousCardId(randomCard.id)
          setIsShowAnswer(false)
          reset()
        })
        .catch(() => {
          data.grade === undefined && handleToastWarning(`Set grade!`)
        }))
  }
  const showAnswerHandler = () => {
    setIsShowAnswer(true)
  }

  if (isLoading && randomCard) {
    return <div>Loading</div>
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <section>
      <BackBtn as={Link} name={t('learnPage.backPreviousPage')} onClick={goBack} path={`#`} />
      {randomCard && (
        <Card className={s.card}>
          <div className={s.container}>
            <Typography as={'h1'} className={s.title} variant={'h1'}>
              {`${t('learnPage.learn')}: "${deckData?.name}"`}
            </Typography>
            <Typography as={'span'} className={s.question} variant={'subtitle1'}>
              {`${t('learnPage.question')}: `}
              <Typography as={'span'} className={s.text} variant={'body1'}>
                {randomCard.question}
              </Typography>
            </Typography>
            {randomCard.questionImg && (
              <div className={s.questionCardImg}>
                <img alt={'question card img'} src={randomCard.questionImg} />
              </div>
            )}
            <Typography as={'h2'} className={s.passQuest} variant={'body2'}>
              {`${t('learnPage.countAttempts')}: ${randomCard.shots}`}
            </Typography>
            {isShowAnswer ? (
              <>
                <Typography as={'span'} className={s.question} variant={'subtitle1'}>
                  {`${t('learnPage.answer')}: `}
                  <Typography as={'span'} className={s.text} variant={'body1'}>
                    {randomCard.answer}
                  </Typography>
                </Typography>
                {randomCard.answerImg && (
                  <div className={s.answerCardImg}>
                    <img alt={'answer card img'} src={randomCard.answerImg} />
                    <Typography as={'span'} className={s.question} variant={'subtitle1'}>
                      {`${t('learnPage.rateYourself')}: `}
                    </Typography>
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    control={control}
                    name={'grade'}
                    render={({ field }) => (
                      <Radio.Root
                        className={s.radio}
                        name={field.name}
                        onValueChange={value => field.onChange(value)}
                        value={`${field.value}`}
                      >
                        {gradeNames.map(grade => (
                          <Radio.Item key={grade.name} value={`${grade.grade}`}>
                            <Typography variant={'body2'}>{grade.name}</Typography>
                          </Radio.Item>
                        ))}
                      </Radio.Root>
                    )}
                  />
                  <Button as={'button'} className={s.nextQuestionBtn} fullWidth type={'submit'}>
                    <Typography as={'span'}>{t('learnPage.nextQuestion')}</Typography>
                  </Button>
                </form>
              </>
            ) : (
              <Button as={'button'} className={s.showBtn} onClick={showAnswerHandler}>
                <Typography as={'span'}>{t('learnPage.showAnswer')}</Typography>
              </Button>
            )}
          </div>
        </Card>
      )}
    </section>
  )
}
