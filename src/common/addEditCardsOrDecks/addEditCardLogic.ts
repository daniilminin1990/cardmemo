import { useEffect, useRef, useState } from 'react'
import { Control } from 'react-hook-form'

import { FormValuesAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import { CardResponse } from '@/services/cards/cards.types'

type Props = {
  control: Control<FormValuesAddEditCard, any>
  img: null | string | undefined
  item?: CardResponse
}
export const useAddEditCardLogic = (props: Props) => {
  const { control, img, item } = props
  const initPreview = item ? img ?? null : ''
  const [preview, setPreview] = useState<null | string>(initPreview)
  const [cover, setCover] = useState<File | null | undefined>(undefined)
  const refInputImg = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (img) {
      setPreview(img)
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
