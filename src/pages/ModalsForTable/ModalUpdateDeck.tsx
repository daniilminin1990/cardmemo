import { ChangeEvent, useState } from 'react'

import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'

import s from './modals.module.scss'

import { Deck } from '../../../services/decks/deck.types'

type Props = {
  item: Deck
  onEditClick?: (name: string) => void
  open: boolean
  setOpen: (value: boolean) => void
}
export const ModalUpdateDeck = (props: Props) => {
  const { item, onEditClick, open, setOpen } = props
  const [updTitle, setUpdTitle] = useState<string>(item.name)
  const onChangeDeckHandler = () => {
    onEditClick?.(updTitle)
    setOpen(false)
  }

  return (
    <Modal onOpenChange={() => setOpen(false)} open={open} title={'Update Deck'}>
      <div className={s.body}>
        <div>
          <Typography variant={'h1'}>{item.name}</Typography>
          <Input
            className={s.input}
            label={'Edit title'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdTitle(e.target.value)}
            placeholder={'Type new title here'}
            value={item.name}
          />
        </div>
        <div>{item.cover}</div>
      </div>
      <div className={s.footer}>
        <Button onClick={() => setOpen(false)} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={onChangeDeckHandler} variant={'primary'}>
          Apply
        </Button>
      </div>
    </Modal>
  )
}
