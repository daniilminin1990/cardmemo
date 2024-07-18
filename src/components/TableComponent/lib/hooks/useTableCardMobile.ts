import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { headersNameCardsMobile } from '@/common/consts/globalVariables'
import { useMeQuery } from '@/features/auth/services/auth.service'
import { CardResponse } from '@/services/cards/cards.types'

type Props = {
  item: CardResponse
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveCardItem: (item: CardResponse) => void
}

export const useTableCardMobile = (props: Props) => {
  const { item, openDeleteModalHandler, openEditModalHandler, retrieveCardItem } = props
  const { data: meData } = useMeQuery()
  const { t } = useTranslation()

  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')

  const [blur, setBlur] = useState(true)

  const onTouchStart = () => {
    setBlur(!blur)
  }

  const onMouseUp = () => {
    setBlur(true)
  }

  const onHandleBlur = () => {
    setBlur(!blur)
  }

  const onDeleteCardHandler = () => {
    retrieveCardItem(item)
    openDeleteModalHandler(true)
  }

  const onEditCardHandler = () => {
    retrieveCardItem(item)
    openEditModalHandler(true)
  }

  const question = t(`${headersNameCardsMobile[0].locale}`)
  const answer = t(`${headersNameCardsMobile[1].locale}`)
  const updated = t(`${headersNameCardsMobile[2].locale}`)
  const grade = t(`${headersNameCardsMobile[3].locale}`)

  return {
    answer,
    blur,
    grade,
    meData,
    onDeleteCardHandler,
    onEditCardHandler,
    onHandleBlur,
    onMouseUp,
    onTouchStart,
    question,
    updated,
    updatedAr,
  }
}
