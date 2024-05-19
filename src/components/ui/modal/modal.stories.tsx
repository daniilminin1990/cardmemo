import { useState } from 'react'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { Meta, StoryFn } from '@storybook/react'

import s from './stories.module.scss'

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
  const [checked, setChecked] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Open Modal
      </Button>
      <Modal
        {...args}
        className={s.customClass}
        onOpenChange={() => setOpen(false)}
        open={open}
        title={'Add New Deck'}
      >
        <div className={s.body}>
          <Input className={s.input} label={'Name Pack'} placeholder={'Name'} />

          <Button className={s.uploadImg} fullWidth variant={'secondary'}>
            <ImageOutline className={s.icon} /> Upload Image
          </Button>
          <Checkbox
            checked={checked}
            className={s.checkbox}
            label={'Private pack'}
            onCheckedChange={() => setChecked(!checked)}
          />
        </div>
        <div className={s.footer}>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} variant={'primary'}>
            Add New Pack
          </Button>
        </div>
      </Modal>
    </>
  )
}

export { ToggleModal }
