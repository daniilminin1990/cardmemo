import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

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
  // render: ({ footer, ...args }: StoryProps) => {
  //   const [open, setOpen] = useState(true)
  //
  //   return (
  //     <>
  //       <Button onClick={() => setOpen(true)} style={{ borderRadius: '5px', padding: '10px' }}>
  //         Open Modal
  //       </Button>
  //       <Modal {...args} open={open} setOpen={() => setOpen(false)} />
  //     </>
  //   )
  // },
}

export default meta

const DefaultModal: StoryObj<StoryProps> = {
  args: {
    children: <div>Some content for the modal</div>,
    // open: true,
    title: 'Default Modal',
  },
}

export { DefaultModal }

const ToggleModal: StoryFn<StoryProps> = (args: StoryProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} style={{ borderRadius: '5px', padding: '10px' }}>
        Open Modal
      </Button>
      <Modal {...args} open={open} setOpen={() => setOpen(false)}>
        <div style={{ paddingBottom: '24px' }}>Some content for the modal</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button style={{ borderRadius: '5px', padding: '10px' }}>left btn</Button>
          <Button onClick={() => setOpen(false)} style={{ borderRadius: '5px', padding: '10px' }}>
            save
          </Button>
        </div>
      </Modal>
    </>
  )
}

export { ToggleModal }
