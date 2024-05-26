import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Page } from '@/pagesMinin/componentsMinin/Page/Page'

import s from './testDecks.module.scss'
export const TestDecks = () => {
  return (
    <Page>
      <div className={s.header}>
        <Typography as={'h1'} variant={'h1'}>
          Test
        </Typography>
        <Button>Add new Deck</Button>
      </div>
    </Page>
  )
}
