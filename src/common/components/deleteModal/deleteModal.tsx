import { ReactNode } from 'react'

import { Button } from '@/common/components/button'
import { Modal } from '@/common/components/modal/modal'

import s from './deleteModal.module.scss'

type Props = {
  children: ReactNode
  deleteFn: () => void
  open: boolean
  setOpen: (open: boolean) => void
  title: string
}
export const DeleteModal = ({ children, deleteFn, open, setOpen, title }: Props) => {
  const deleteDeckHandler = () => {
    deleteFn()
    setOpen(false)
  }
  const hideModal = () => {
    setOpen(false)
  }

  return (
    <Modal className={s.modal} onOpenChange={hideModal} open={open} title={title}>
      <div className={s.text}>{children}</div>
      <div className={s.btns}>
        <Button onClick={hideModal} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={deleteDeckHandler} type={'submit'} variant={'primary'}>
          Delete Deck
        </Button>
      </div>
    </Modal>
  )
}
