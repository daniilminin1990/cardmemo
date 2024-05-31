import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'

import s from './deleteModal.module.scss'

type Props = {
  children: ReactNode
  deleteFn: () => void
  open: boolean
  setOpen: (open: boolean) => void
  title: string
}
export const DeleteModal = ({ children, deleteFn, open, setOpen, title }: Props) => {
  const deleteHandler = () => {
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
        <Button onClick={deleteHandler} type={'submit'} variant={'primary'}>
          {title}
        </Button>
      </div>
    </Modal>
  )
}
