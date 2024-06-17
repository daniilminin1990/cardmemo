import { useTranslation } from 'react-i18next'

import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import Typography from '@/components/ui/Typography/Typography'
import { useDeleteDeck } from '@/features/cards/lib/hooks/useDeleteDeck'
import { Deck } from '@/services/decks/deck.types'

type Props = {
  deckData?: Deck
  deckId: string
  isDeleteDeckModal: boolean
  setIsDeleteDeckModal: (isDeleteDeckModal: boolean) => void
}

export const DeleteDeck = ({
  deckData,
  deckId,
  isDeleteDeckModal,
  setIsDeleteDeckModal,
}: Props) => {
  const { onDeleteDeckHandler } = useDeleteDeck({ deckId, setIsDeleteDeckModal })

  const { t } = useTranslation()

  return (
    <>
      {' '}
      <DeleteModal
        deleteFn={onDeleteDeckHandler}
        open={isDeleteDeckModal}
        setOpen={setIsDeleteDeckModal}
        title={t('cardsPage.deleteDeck')}
      >
        {' '}
        <Typography variant={'h1'}>{deckData?.name}</Typography>
        <Typography variant={'body1'}>{t('cardsPage.isDeleteDeck')}</Typography>
      </DeleteModal>
    </>
  )
}
