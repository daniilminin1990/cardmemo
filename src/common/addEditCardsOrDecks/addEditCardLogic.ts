import { useEffect, useRef, useState } from 'react'
import { Control } from 'react-hook-form'

import { FormValuesAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import { CardResponse } from '@/services/cards/cards.types'
import { cardsActions } from '@/services/cardsSlice/cardsSlice'
import { useAppDispatch } from '@/services/store'

type Props = {
  control: Control<FormValuesAddEditCard, any>
  img: null | string | undefined
  item?: CardResponse
  label: string
}
export const useAddEditCardLogic = (props: Props) => {
  const { control, img, item, label } = props
  const initPreview = item ? img ?? null : ''
  const [preview, setPreview] = useState<null | string>(initPreview)
  const [cover, setCover] = useState<File | null | undefined>(undefined)
  const refInputImg = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (img) {
      setPreview(img)
      label === 'question'
        ? dispatch(cardsActions.setPreviewQuestion({ previewQuestion: img }))
        : dispatch(cardsActions.setPreviewAnswer({ previewAnswer: img }))
    }
  }, [img])
  // Генерируем ссылку на загружаемый файл и сэтаем в preview, который будем отображать, и очищаем после сэта хэш
  useEffect(() => {
    if (cover) {
      const newPreviewQuestion = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }

      setPreview(newPreviewQuestion)
      label === 'question'
        ? dispatch(cardsActions.setPreviewQuestion({ previewQuestion: newPreviewQuestion }))
        : dispatch(cardsActions.setPreviewAnswer({ previewAnswer: newPreviewQuestion }))

      return () => URL.revokeObjectURL(newPreviewQuestion)
    }
  }, [cover])

  return {
    control,
    cover,
    preview,
    refInputImg,
    setCover,
    setPreview,
  }
}
