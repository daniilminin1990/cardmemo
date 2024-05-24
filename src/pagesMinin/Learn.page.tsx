import { Link, useParams } from 'react-router-dom'

import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Card } from '@/components/ui/card'
import { Page } from '@/pagesMinin/componentsMinin/Page/Page'

import s from './learn.page.module.scss'

import { useGetDeckByIdQuery } from '../../services/decks/decks.service'

export const LearnPage = () => {
  const deckId = useParams().deckId
  const { data: deck } = useGetDeckByIdQuery({ id: deckId ?? '' })

  return (
    <Page mt={'24px'}>
      {/*<h1>Текст для вашей рекламы</h1>*/}
      <div className={s.headingFirstRow}>
        <Typography as={Link} style={{ textDecoration: 'none' }} to={'/'} variant={'body2'}>
          <ArrowBackOutline className={s.backIcon} />
          Back to Deck List
        </Typography>
      </div>
      <Card className={s.card}>
        <Typography className={s.centerText} variant={'h1'}>
          Learn {deck?.name}
        </Typography>
      </Card>
    </Page>
  )
}
