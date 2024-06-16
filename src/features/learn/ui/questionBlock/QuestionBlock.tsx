import { useTranslation } from 'react-i18next'

import Typography from '@/components/ui/Typography/Typography'
import { CardWithGradeResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'

import s from './QuestionBlock.module.scss'

type Props = {
  deckData?: Deck
  randomCard: CardWithGradeResponse
}

export const QuestionBlock = ({ deckData, randomCard }: Props) => {
  const { t } = useTranslation()

  const isQuestionImg = randomCard.questionImg

  return (
    <>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {`${t('learnPage.learn')}: "${deckData?.name}"`}
      </Typography>
      <Typography as={'span'} className={s.question} variant={'subtitle1'}>
        {`${t('learnPage.question')}: `}
        <Typography as={'span'} className={s.text} variant={'body1'}>
          {randomCard.question}
        </Typography>
      </Typography>
      {isQuestionImg && (
        <div className={s.questionCardImg}>
          <img alt={'question card img'} src={isQuestionImg} />
        </div>
      )}
      <Typography as={'h2'} className={s.passQuest} variant={'body2'}>
        {`${t('learnPage.countAttempts')}: ${randomCard.shots}`}
      </Typography>
    </>
  )
}
