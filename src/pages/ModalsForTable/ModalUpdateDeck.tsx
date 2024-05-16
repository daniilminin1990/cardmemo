import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { Modal } from '@/components/ui/modal/modal'

import { Deck } from '../../../services/decks/deck.types'

type Props = {
  item: Deck
  onEditClick?: (id: string) => void
  open: boolean
  setOpen: (value: boolean) => void
}
export const ModalUpdateDeck = (props: Props) => {
  const { item, onEditClick, open, setOpen } = props
  const onChangeDeckHandler = () => {
    onEditClick?.(item.id)
    setOpen(false)
  }

  console.log('UPDATE DECK', item)

  return (
    <Modal onOpenChange={() => setOpen(false)} open={open} title={'Add New Deck'}>
      <div style={{ paddingBottom: '34px' }}>
        <div>
          <Typography variant={'h1'}>{item.name}</Typography>
          <Input
            label={'Edit title'}
            placeholder={'Type new title here'}
            style={{ marginBottom: '14px', width: '100%' }}
          />
        </div>
        <div>{item.cover}</div>
        <div
          style={{
            gap: '5px',
            marginBottom: '24px',
          }}
        >
          {/*<Button fullWidth variant={'secondary'}>*/}
          {/*  <ImageOutline className={s.icon} /> Upload Image*/}
          {/*</Button>*/}
        </div>

        <div style={{ marginLeft: '5px' }}>
          <Checkbox label={'Private pack'} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
