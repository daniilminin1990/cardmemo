import { useState } from 'react'

import { AddNewPack } from '@/components/forms/add-new-pack/add-new-pack'
import { Button } from '@/components/ui/button'
import { Modal, Props as ModalProps } from '@/components/ui/modal/modal'
import { Meta, StoryFn } from '@storybook/react'

import s from '@/components/forms/add-new-pack/stories.module.scss'

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
  title: 'Components/Forms/AddNewPack/AddNewPack',
}

export default meta

const AddNewPackToggle: StoryFn<StoryProps> = (args: StoryProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Add New Pack
      </Button>
      <Modal
        {...args}
        className={s.customClass}
        onOpenChange={() => setOpen(false)}
        open={open}
        title={'Add New Pack'}
      >
        <AddNewPack onSubmit={() => {}} setOpenModal={setOpen} />
      </Modal>
    </>
  )
}

export { AddNewPackToggle }
