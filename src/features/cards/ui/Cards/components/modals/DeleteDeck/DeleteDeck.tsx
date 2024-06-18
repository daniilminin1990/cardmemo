import { useTranslation } from 'react-i18next'

import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import Typography from '@/components/ui/Typography/Typography'
import { useDeleteDeck } from '@/features/cards/lib/hooks/useDeleteDeck'
import { ModalKey, useModal } from '@/hooks/useModal'
import { Deck } from '@/services/decks/deck.types'

type Props = {
  deckData?: Deck
  deckId: string
}

export const DeleteDeck = ({ deckData, deckId }: Props) => {
  const { onDeleteDeckHandler } = useDeleteDeck({ deckId })
  const { isOpen, setOpen } = useModal(ModalKey.DeleteDeck)

  const { t } = useTranslation()

  return (
    <>
      <DeleteModal
        deleteFn={onDeleteDeckHandler}
        open={isOpen}
        setOpen={setOpen}
        title={t('cardsPage.deleteDeck')}
      >
        <Typography variant={'h1'}>{deckData?.name}</Typography>
        <Typography variant={'body1'}>{t('cardsPage.isDeleteDeck')}</Typography>
      </DeleteModal>
    </>
  )
}
