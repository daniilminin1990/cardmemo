import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { BackBtn } from '@/components/pages/common/backBtn/backBtn'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Radio } from '@/components/ui/radio/radio'
import { useNavigation } from '@/components/utils/hooks/useNavigate'
import { useGetCardsQuery } from '@/services/cards/cards.services'
import { useGetDeckByIdQuery } from '@/services/decks/decks.services'

import s from './learnList.module.scss'

type Props = {}

export const LearnList = ({}: Props) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const { control, handleSubmit } = useForm()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const { goBack } = useNavigation()
  const { id } = useParams()
  const { data } = useGetCardsQuery({ id: id || '' })
  const { data: deckData } = useGetDeckByIdQuery({ id: id || '' })

  console.log(deckData)
  const onSubmit = async (data: any) => {
    console.log(data)
  }

  const showNextQuestionHandler = () => {
    data?.items && setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % data?.items.length)
    setIsShowAnswer(false)
  }
  const showAnswwerHandler = () => {
    setIsShowAnswer(true)
  }

  const gradeNames = [
    { name: 'Did not know' },
    { name: 'Forgot' },
    { name: 'A lot of thought' },
    { name: 'Confused' },
    { name: 'Knew the answer' },
  ]
  const question = data?.items[currentQuestionIndex]

  return (
    <section>
      <BackBtn goTo={goBack} name={'Back to Previous Page'} />
      {question ? (
        <Card className={s.card}>
          <div className={s.container}>
            <Typography as={'h1'} className={s.title} variant={'h1'}>
              Learn место для Имени карточки
            </Typography>
            <Typography as={'span'} className={s.question} variant={'subtitle1'}>
              Question:
              <Typography as={'span'} className={s.text} variant={'body1'}>
                {question.question}
              </Typography>
            </Typography>
            {question.questionImg && (
              <div className={s.questionCardImg}>
                <img alt={'question card img'} src={question.questionImg} />
              </div>
            )}
            <Typography as={'h2'} className={s.passQuest} variant={'body2'}>
              Count of attempts: {question.shots}
            </Typography>
            {isShowAnswer ? (
              <>
                <Typography as={'span'} className={s.question} variant={'subtitle1'}>
                  Answer:
                  <Typography as={'span'} className={s.text} variant={'body1'}>
                    {question.answer}
                  </Typography>
                </Typography>
                {question.answerImg && (
                  <div className={s.answerCardImg}>
                    <img alt={'answer card img'} src={question.answerImg} />
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
                          <Radio.Item key={grade.name} value={grade.name}>
                            <Typography variant={'body2'}>{grade.name}</Typography>
                          </Radio.Item>
                        ))}
                      </Radio.Root>
                    )}
                  />
                  <Button
                    as={'a'}
                    className={s.nextQuestionBtn}
                    fullWidth
                    onClick={showNextQuestionHandler}
                  >
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
      ) : (
        <div>Loading</div>
      )}
    </section>
  )
}
