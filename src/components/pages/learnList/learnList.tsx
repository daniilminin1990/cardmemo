import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { BackBtn } from '@/components/pages/common/backBtn/backBtn'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Radio } from '@/components/ui/radio/radio'
import { useNavigation } from '@/components/utils/hooks/useNavigate'
import {
  useGetDeckByIdQuery,
  useGetRandomCardByIdQuery,
  useUpdateCardGradeMutation,
} from '@/services/decks/decks.services'
import { DevTool } from '@hookform/devtools'

import s from './learnList.module.scss'

type Props = {}

export const LearnList = ({}: Props) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { grade: '' },
  })

  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [previousCardId, setPreviousCardId] = useState('')

  const { goBack } = useNavigation()
  const { id } = useParams()

  const { data: deckData } = useGetDeckByIdQuery({ id: id || '' })
  const { data: randomCard, isLoading } = useGetRandomCardByIdQuery({
    id: id || '',
    previousCardId: previousCardId,
  })

  console.log(randomCard?.grade)
  const [updateCardGrade] = useUpdateCardGradeMutation()

  const onSubmit = async (data: any) => {
    console.log(data)
    await updateCardGrade({ cardId: randomCard?.id, grade: data.grade })
      .unwrap()
      .then(() => {
        setPreviousCardId(randomCard?.id)
        setIsShowAnswer(false)
        reset()
      })
      .catch(error => {
        console.error('Try again or later', error)
      })
  }
  const showAnswwerHandler = () => {
    setIsShowAnswer(true)
  }

  const gradeNames = [
    { grade: 1, name: 'Did not know' },
    { grade: 2, name: 'Forgot' },
    { grade: 3, name: 'A lot of thought' },
    { grade: 4, name: 'Confused' },
    { grade: 5, name: 'Knew the answer' },
  ]

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <section>
      <DevTool control={control} />
      <BackBtn goTo={goBack} name={'Back to Previous Page'} />
      {randomCard && (
        <Card className={s.card}>
          <div className={s.container}>
            <Typography as={'h1'} className={s.title} variant={'h1'}>
              Learn {deckData?.name}
            </Typography>
            <Typography as={'span'} className={s.question} variant={'subtitle1'}>
              Question:
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
              Count of attempts: {randomCard.shots}
            </Typography>
            {isShowAnswer ? (
              <>
                <Typography as={'span'} className={s.question} variant={'subtitle1'}>
                  Answer:
                  <Typography as={'span'} className={s.text} variant={'body1'}>
                    {randomCard.answer}
                  </Typography>
                </Typography>
                {randomCard.answerImg && (
                  <div className={s.answerCardImg}>
                    <img alt={'answer card img'} src={randomCard.answerImg} />
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
                        value={field.value}
                      >
                        {gradeNames.map(grade => (
                          <Radio.Item key={grade.name} value={grade.grade}>
                            <Typography variant={'body2'}>{grade.name}</Typography>
                          </Radio.Item>
                        ))}
                      </Radio.Root>
                    )}
                  />
                  <Button as={'button'} className={s.nextQuestionBtn} fullWidth type={'submit'}>
                    <Typography as={'span'}>Next Question</Typography>
                  </Button>
                </form>
              </>
            ) : (
              <Button as={'button'} className={s.showBtn} onClick={showAnswwerHandler}>
                <Typography as={'span'}>Show Answer</Typography>
              </Button>
            )}
          </div>
        </Card>
      )}
    </section>
  )
}
