import { useTranslation } from 'react-i18next'

import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import Typography from '@/components/ui/Typography/Typography'
import { CardResponse } from '@/features/cards/api/cardsApi.types'
import { useDeleteCardByIdMutation } from '@/services/cards/cards.service'

type Props = {
  cardItem?: CardResponse
  isDeleteCardModal: boolean
  setIsDeleteCardModal: (isDeleteCardModal: boolean) => void
}

export const DeleteCard = ({ cardItem, isDeleteCardModal, setIsDeleteCardModal }: Props) => {
  const [deleteCard] = useDeleteCardByIdMutation()

  const { t } = useTranslation()

  const onDeleteCardHandler = () => {
    deleteCard({ id: cardItem?.id ?? '' })
  }

  return (
    <DeleteModal
      deleteFn={onDeleteCardHandler}
      open={isDeleteCardModal}
      setOpen={setIsDeleteCardModal}
      title={t('cardsPage.deleteCard')}
    >
      <Typography variant={'h1'}>{cardItem?.question}</Typography>
      <Typography variant={'body1'}>{t('cardsPage.isDeleteCard')}</Typography>
    </DeleteModal>
  )
}
