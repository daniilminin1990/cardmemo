import { ComponentPropsWithoutRef } from 'react'

import { Card } from '@/common/components/card'
import Typography from '@/common/components/typography/typography'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

export type Props = {
  onOpenChange: (value: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, title, ...props }: Props) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Content className={s.DialogContent}>
        <Card>
          <div className={s.header}>
            <Typography as={'h2'} variant={'h2'}>
              {title}
            </Typography>
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
