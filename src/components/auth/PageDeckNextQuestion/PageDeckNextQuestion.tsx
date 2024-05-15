import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Radio } from '@/components/ui/radio'

import style from './PageDeckNextQuestion.module.scss'

import imgage from '../../../assets/img/PageDeckNextQuestionImg.png'
type PageDeckNextQuestionProps = {
  status: boolean
}
const PageDeckNextQuestion = (props: PageDeckNextQuestionProps) => {
  const { status } = props

  return (
    <div>
      <Card className={style.box}>
        <Typography as={'h1'} className={style.title} variant={'large'}>
          Learn “Deck Name”
        </Typography>
        <div className={style.subtitleQuestionBox}>
          <Typography as={'span'} className={style.subtitleQuestion} variant={'body1'}>
            Question: How "This" works in JavaScript?
          </Typography>
          {status && <img alt={'213'} src={imgage} />}
          <Typography className={style.countTry}>
            Количество попыток ответов на вопрос: 10
          </Typography>
        </div>
        <div className={style.subtitleAnswerBox}>
          <Typography as={'span'} className={style.subtitleAnswer} variant={'body1'}>
            Answer: This is how "This" works in JavaScript
          </Typography>
          {status && <img alt={'123'} src={imgage} />}
        </div>

        <div className={style.radio}>
          <Typography variant={'subtitle1'}>Rate yourself:</Typography>
          <Radio.Root name={'grade'}>
            <Radio.Item value={'1 radio'}>Did not know</Radio.Item>
            <Radio.Item value={'2 radio'}>Forgot</Radio.Item>
            <Radio.Item value={'3 radio'}>A lot of though</Radio.Item>
            <Radio.Item value={'4 radio'}>Сonfused</Radio.Item>
            <Radio.Item value={'5 radio'}>Knew the answer</Radio.Item>
          </Radio.Root>
        </div>
        <Button className={style.button} fullWidth>
          Next Question
        </Button>
      </Card>
    </div>
  )
}

export default PageDeckNextQuestion
