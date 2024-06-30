import { useTranslation } from 'react-i18next'

import { ModalKey, useModal } from '@/common/hooks/useModal'
import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import Typography from '@/components/ui/Typography/Typography'
import { CardResponse } from '@/features/cards/api/cardsApi.types'
import { useDeleteCardByIdMutation } from '@/services/cards/cards.service'

type Props = {
  cardItem?: CardResponse
}

export const DeleteCard = ({ cardItem }: Props) => {
  const [deleteCard] = useDeleteCardByIdMutation()

  const { t } = useTranslation()

  const { isOpen, setOpen } = useModal(ModalKey.DeleteCard)

  const onDeleteCardHandler = () => {
    deleteCard({ id: cardItem?.id ?? '' })
  }

  return (
    <DeleteModal
      deleteFn={onDeleteCardHandler}
      open={isOpen}
      setOpen={setOpen}
      title={t('cardsPage.deleteCard')}
    >
      <Typography variant={'h1'}>{cardItem?.question}</Typography>
      <Typography variant={'body1'}>{t('cardsPage.isDeleteCard')}</Typography>
    </DeleteModal>
  )
}
