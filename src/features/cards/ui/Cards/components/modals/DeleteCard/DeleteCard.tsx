import { useTranslation } from 'react-i18next'

import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import Typography from '@/components/ui/Typography/Typography'
import { CardResponse } from '@/features/cards/api/cardsApi.types'
import { useDeleteCardByIdMutation } from '@/services/cards/cards.service'
import { ModalKey, useModal } from "@/features/cards/lib/hooks/useModal";

type Props = {
  cardItem?: CardResponse
}

export const DeleteCard = ({ cardItem }: Props) => {
  const [deleteCard] = useDeleteCardByIdMutation()

  const { t } = useTranslation()

  const {setOpen,isOpen} = useModal(ModalKey.DeleteCard)

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
