import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormValuesAddEditDeck, schemaAddEditDeck } from '@/common/zodSchemas/decks/decks.schemas'
import { Deck } from '@/services/decks/deck.types'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  item?: Deck
}
export const useAddEditDeckLogic = ({ item }: Props) => {
  const refInputImg = useRef<HTMLInputElement>(null)
  const [cover, setCover] = useState<File | null | undefined>(undefined)
  const initPreview = item ? item.cover ?? null : ''
  const [preview, setPreview] = useState<null | string>(initPreview)
  const { control, handleSubmit } = useForm<FormValuesAddEditDeck>({
    defaultValues: item
      ? { isPrivate: item.isPrivate, name: item.name }
      : { isPrivate: false, name: '' },
    resolver: zodResolver(schemaAddEditDeck),
  })

  useEffect(() => {
    if (item?.cover) {
      setPreview(item?.cover)
    }
  }, [item?.cover])
  useEffect(() => {
    if (cover) {
      const newPreview = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }

      setPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
  }, [cover])

  return {
    control,
    cover,
    handleSubmit,
    preview,
    refInputImg,
    setCover,
    setPreview,
  }
}
