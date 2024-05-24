import { useParams } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Card } from '@/components/ui/card'

import s from './learn.page.module.scss'

import { useGetDeckByIdQuery } from '../../services/decks/decks.service'

export const LearnPage = () => {
  const deckId = useParams().deckId
  const { data: deck } = useGetDeckByIdQuery({ id: deckId ?? '' })

  return (
    <Card className={s.card}>
      <Typography className={s.heading} variant={'h1'}>
        Learn {deck?.name}
      </Typography>
    </Card>
  )
}
