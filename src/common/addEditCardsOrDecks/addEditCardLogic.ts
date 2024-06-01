import { useEffect, useRef, useState } from 'react'

import { CardResponse } from '@/services/cards/cards.types'

type Props = {
  getPreviewHandler: (preview: null | string) => void
  img: null | string | undefined
  item?: CardResponse
}
export const useAddEditCardLogic = (props: Props) => {
  const { getPreviewHandler, img, item } = props
  const initPreview = item ? img ?? null : ''
  const [preview, setPreview] = useState<null | string>(initPreview)
  const [cover, setCover] = useState<File | null | undefined>(undefined)
  const refInputImg = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (img) {
      setPreview(img)
      getPreviewHandler(img)
    }
  }, [img])
  useEffect(() => {
    if (cover) {
      const newPreview = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }

      setPreview(newPreview)
      getPreviewHandler(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
  }, [cover])

  return {
    cover,
    preview,
    refInputImg,
    setCover,
    setPreview,
  }
}
