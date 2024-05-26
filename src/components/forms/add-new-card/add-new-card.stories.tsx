import { useState } from 'react'

import { AddNewCard } from '@/components/forms/add-new-card/add-new-card'
import { Button } from '@/components/ui/button'
import { Modal, Props as ModalProps } from '@/components/ui/modal/modal'
import { Meta, StoryFn } from '@storybook/react'

import s from '@/components/forms/add-new-card/stories.module.scss'

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
  title: 'Components/Forms/AddNewCard/AddNewCard',
}

export default meta

const AddNewCardToggle: StoryFn<StoryProps> = (args: StoryProps) => {
  const [open, setOpen] = useState(false)

  const onSubmit = (data: FormData) => {
    let res = ''

    for (const pair of data.entries()) {
      res += pair[0] + ': ' + pair[1] + ' | '
    }
    alert(res)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Add New Card
      </Button>
      <Modal
        {...args}
        className={s.customClass}
        onOpenChange={() => setOpen(false)}
        open={open}
        title={'Add New Card'}
      >
        <AddNewCard onSubmit={onSubmit} setOpenModal={setOpen} />
      </Modal>
    </>
  )
}

export { AddNewCardToggle }
