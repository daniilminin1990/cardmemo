import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { path } from '@/app/router/path'
import { ModalKey, useModal } from '@/common/hooks/useModal'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'

import s from './ModalOnEmpty.module.scss'

const ModalOnEmpty = memo(() => {
  const { isOpen, setOpen } = useModal(ModalKey.Empty)
  const onCloseModal = () => {
    setOpen(false)
  }
  const { t } = useTranslation()

  return (
    <Modal
      className={s.modal}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      title={`${t('modalOnEmpty.areYouSure')}`}
    >
      <div className={s.body}>
        <Typography variant={'body1'}>{t('modalOnEmpty.reallyWant')}</Typography>
      </div>
      <div className={s.footer}>
        <Button className={s.button} onClick={onCloseModal} variant={'secondary'}>
          <Typography variant={'subtitle2'}>{t('modalOnEmpty.no')}</Typography>
        </Button>
        <Button
          as={Link}
          className={s.button}
          onClick={onCloseModal}
          to={`${path.decks}`}
          variant={'primary'}
        >
          <Typography variant={'subtitle2'}>{t('modalOnEmpty.yes')}</Typography>
        </Button>
      </div>
    </Modal>
  )
})

export default ModalOnEmpty
