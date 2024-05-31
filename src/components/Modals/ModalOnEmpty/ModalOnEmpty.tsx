import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { path } from '@/router/path'

import s from './ModalOnEmpty.module.scss'

type Props = {
  open: boolean
  setIsOpenModal: (value: boolean) => void
}
const ModalOnEmpty = (props: Props) => {
  const { open, setIsOpenModal } = props
  const onDeleteDeckHandler = () => {
    setIsOpenModal(false)
  }
  const { t } = useTranslation()

  return (
    <Modal
      onOpenChange={() => setIsOpenModal(false)}
      open={open}
      title={`${t('modalOnEmpty.areYouSure')}`}
    >
      <div className={s.body}>
        <Typography variant={'body1'}>{t('modalOnEmpty.reallyWant')}</Typography>
      </div>
      <div className={s.footer}>
        <Button className={s.button} onClick={onDeleteDeckHandler} variant={'secondary'}>
          <Typography variant={'subtitle2'}>{t('modalOnEmpty.no')}</Typography>
        </Button>
        <Button as={Link} className={s.button} to={`${path.decks}`} variant={'primary'}>
          <Typography variant={'subtitle2'}>{t('modalOnEmpty.yes')}</Typography>
        </Button>
      </div>
    </Modal>
  )
}

export default ModalOnEmpty
