import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { useQueryParams } from '@/common/hooks/useQueryParams'
import { useTableMessage } from '@/components/TableComponent/lib/hooks/useTableMessage'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'

type Props = {
  data?: CardResponse[] | Deck[]
}

export const useTableHeadMobile = (props: Props) => {
  const { data } = props
  const { currentOrderBy, setSortByQuery } = useQueryParams()
  const { t } = useTranslation()
  const { search: queryParameters } = useLocation()
  const { getMessage } = useTableMessage()

  const conditionOfZeroData = data?.length === 0

  const message = getMessage(conditionOfZeroData, queryParameters)

  return {
    currentOrderBy,
    message,
    setSortByQuery,
    t,
  }
}
