import defaltDeckImg from '@/assets/img/defaultDeckImg.png'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { DecksProps } from '@/components/ui/table/decks/Decks'
import { DeckBtns } from '@/components/ui/table/decks/btns/DeckBtns'

import s from './deck.module.scss'

type Props = {
  item: DecksProps
}

export const Deck = ({ item }: Props) => {
  return (
    <Table.Row className={s.container} key={item.id}>
      <Table.Cell>
        <Button as={'a'} className={s.nameBlock} fullWidth href={'/'}>
          <img alt={'default card img'} className={s.defaltDeckImg} src={defaltDeckImg} />
          <Typography as={'h3'} variant={'body2'}>
            {item.name}
          </Typography>
        </Button>
      </Table.Cell>
      <Table.Cell className={s.empty}>{item.cardsCount}</Table.Cell>
      <Table.Cell>{item.updated}</Table.Cell>
      <Table.Cell>{item.author.name}</Table.Cell>
      <Table.Cell>
        <DeckBtns disabled={item.cardsCount === 0} item={item} />
      </Table.Cell>
    </Table.Row>
  )
}
