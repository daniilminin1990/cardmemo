import { PropsWithChildren } from 'react'

import { Card } from '@/components/ui/card'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

export type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
} & PropsWithChildren

export const Modal = ({ children, open, setOpen, title }: Props) => (
  <Dialog.Root onOpenChange={() => setOpen(open)} open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Content className={s.DialogContent}>
        <Card className={s.card}>
          <div className={s.header}>
            <Dialog.Title className={s.title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label={'Close'} className={s.closeBtn}>
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </div>
          <div className={s.content}>{children}</div>
        </Card>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
