import { useLocation } from 'react-router-dom'

import { selectApp, selectBlur } from '@/app/model'
import { setBlur } from '@/app/model/app.slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { useTableMessage } from '@/components/TableComponent/lib/hooks/useTableMessage'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'
import { useGetDecksQuery } from '@/services/decks/decks.service'
export const useTableData = (data: CardResponse[] | Deck[] | undefined) => {
  const { currentOrderBy, setSortByQuery } = useQueryParams()
  const app = useAppSelector(selectApp)
  const blur = useAppSelector(selectBlur)
  const dispatch = useAppDispatch()
  const { search: queryParameters } = useLocation()
  const { data: dataFromGetDecksQuery } = useGetDecksQuery()
  const { getMessage } = useTableMessage()

  const conditionOfZeroData = dataFromGetDecksQuery?.items.length === 0 || data?.length === 0

  const message = getMessage(conditionOfZeroData, queryParameters)

  const onClickEyeHandler = (e: MouseEvent) => {
    e.stopPropagation()
    dispatch(setBlur({ blur: !blur }))
  }

  return {
    app,
    blur,
    currentOrderBy,
    message,
    onClickEyeHandler,
    setSortByQuery,
  }
}
