import Typography from '@/components/ui/Typography/Typography'
import { BackBtn } from '@/components/ui/backBtn/BackBtn'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLearnPage } from '@/features/learn/lib/hooks/useLearnPage'
import { AnswerBlock } from '@/features/learn/ui/answerBlock/AnswerBlock'
import { QuestionBlock } from '@/features/learn/ui/questionBlock/QuestionBlock'

import s from './LearnPage.module.scss'

export const LearnPage = () => {
  const {
    backToCardsPage,
    deckData,
    isShowAnswer,
    nextAnimation,
    onSubmit,
    randomCard,
    showAnswerHandler,
    t,
  } = useLearnPage()

  return (
    <section>
      <BackBtn to={backToCardsPage}>{t('learnPage.backCardsPage')}</BackBtn>
      {randomCard && (
        <Card className={s.card}>
          <div className={`${s.container} ${nextAnimation}`}>
            <QuestionBlock deckData={deckData} randomCard={randomCard} />
            {isShowAnswer ? (
              <AnswerBlock onSubmit={onSubmit} randomCard={randomCard} />
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
