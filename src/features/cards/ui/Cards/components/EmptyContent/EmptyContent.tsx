import { useTranslation } from 'react-i18next'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { CardsListResponse } from '@/features/cards/api/cardsApi.types'
import { Deck } from '@/services/decks/deck.types'

import s from '@/features/cards/ui/Cards/Cards.module.scss'

type Props = {
  conditionMessage: string
  currentData?: CardsListResponse
  deckData?: Deck
  isMineCards: boolean
  search: string
  setIsCreateCardModal: (isCreateCardModal: boolean) => void
}

export const EmptyContent = ({
  conditionMessage,
  currentData,
  deckData,
  isMineCards,
  search,
  setIsCreateCardModal,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.emptyContent}>
      <Typography variant={'body1'}>{conditionMessage}</Typography>
      {search === '' &&
        isMineCards &&
        deckData?.cardsCount === 0 &&
        currentData?.items.length === 0 && (
          <Button className={s.addCard} onClick={() => setIsCreateCardModal(true)} type={'button'}>
            <Typography variant={'subtitle2'}>{t('cardsPage.addNewCard')}</Typography>
          </Button>
        )}
    </div>
  )
}
