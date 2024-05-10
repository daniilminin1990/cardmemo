import { useState } from 'react'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { Meta, StoryFn } from '@storybook/react'

import { Modal, Props as ModalProps } from './modal'

interface CustomArgs {
  footer?: string
}

type StoryProps = CustomArgs & ModalProps

const meta: Meta<StoryProps> = {
  argTypes: {
    open: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
  },
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
}

export default meta

const ToggleModal: StoryFn<StoryProps> = (args: StoryProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Open Modal
      </Button>
      <Modal {...args} onOpenChange={() => setOpen(false)} open={open} title={'Add New Deck'}>
        <div style={{ paddingBottom: '34px' }}>
          <div>
            <Input
              label={'Name Pack'}
              placeholder={'Name'}
              style={{ marginBottom: '14px', width: '100%' }}
            />
          </div>
          <div
            style={{
              gap: '5px',
              marginBottom: '24px',
            }}
          >
            <Button fullWidth variant={'secondary'}>
              <ImageOutline /> Upload Image
            </Button>
          </div>

          <div style={{ marginLeft: '5px' }}>
            <Checkbox label={'Private pack'} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant={'secondary'}>Cancel</Button>
          <Button onClick={() => setOpen(false)} variant={'primary'}>
            Add New Pack
          </Button>
        </div>
      </Modal>
    </>
  )
}

export { ToggleModal }
