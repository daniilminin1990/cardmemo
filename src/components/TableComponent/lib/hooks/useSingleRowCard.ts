import { useState } from 'react'

import { selectApp, selectBlur } from '@/app/model'
import { useAppSelector } from '@/app/store/store'
import { useMeQuery } from '@/features/auth/services/auth.service'
import { CardResponse } from '@/services/cards/cards.types'

type Props = {
  item: CardResponse
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveCardItem: (item: CardResponse) => void
}

export const useSingleRowCard = (props: Props) => {
  const { item, openDeleteModalHandler, openEditModalHandler, retrieveCardItem } = props
  const { data: meData } = useMeQuery()
  const [blur, setBlur] = useState(true)
  const app = useAppSelector(selectApp)
  const blurGlobal = useAppSelector(selectBlur)

  const onDeleteCardHandler = () => {
    retrieveCardItem(item)
    openDeleteModalHandler(true)
  }

  const onEditCardHandler = () => {
    retrieveCardItem(item)
    openEditModalHandler(true)
  }

  const onHandleBlur = () => {
    setBlur(!blur)
  }

  const onMouseDown = () => {
    setBlur(!blur) // При зажатии мыши устанавливаем эффект "блюра"
  }

  const onMouseUp = () => {
    setBlur(true) // При отпускании мыши снимаем эффект "блюра"
  }

  const fragmentWithBlur = blurGlobal && blur ? 'coverImg blur' : 'coverImg'

  return {
    app,
    blur,
    blurGlobal,
    fragmentWithBlur,
    meData,
    onDeleteCardHandler,
    onEditCardHandler,
    onHandleBlur,
    onMouseDown,
    onMouseUp,
  }
}
