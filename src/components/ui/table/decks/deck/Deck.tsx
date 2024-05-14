import defaltDeckImg from '@/assets/img/defaultDeckImg.png'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { DeckBtns } from '@/components/ui/table/decks/btns/DeckBtns'
import { DeckProps } from '@/components/ui/table/decks/decks.types'

import s from './deck.module.scss'

type Props = {
  item: DeckProps
}

export const Deck = ({ item }: Props) => {
  return (
    <Table.Row className={s.container} key={item.id}>
      <Table.Cell>
        <Button as={'a'} className={s.nameBlock} fullWidth href={'/'}>
          <img
            alt={'default card img'}
            className={s.defaltDeckImg}
            src={item.cover ?? defaltDeckImg}
          />
          <Typography as={'h3'} variant={'body2'}>
            {item.name}
          </Typography>
        </Button>
      </Table.Cell>
      <Table.Cell>{item.cardsCount}</Table.Cell>
      <Table.Cell>{new Date(item.updated).toLocaleDateString()}</Table.Cell>
      <Table.Cell className={s.authorCell}>{item.author.name}</Table.Cell>
      <Table.Cell>
        <DeckBtns disabled={item.cardsCount === 0} item={item} />
      </Table.Cell>
    </Table.Row>
  )
}
