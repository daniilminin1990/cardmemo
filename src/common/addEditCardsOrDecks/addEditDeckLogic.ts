import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormValuesAddEditDeck, schemaAddEditDeck } from '@/common/zodSchemas/decks/decks.schemas'
import { Deck } from '@/services/decks/deck.types'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  item?: Deck
}
export const useAddEditDeckLogic = ({ item }: Props) => {
  const initPreview = item ? item.cover ?? null : ''
  const [preview, setPreview] = useState<null | string>(initPreview)
  const [cover, setCover] = useState<File | null | undefined>(undefined)
  const refInputImg = useRef<HTMLInputElement>(null)
  const { control, handleSubmit, setValue, watch } = useForm<FormValuesAddEditDeck>({
    resolver: zodResolver(schemaAddEditDeck),
  })

  // setValue('isPrivate', item?.isPrivate)
  // getValues('isPrivate')
  useEffect(() => {
    if (item?.cover) {
      setPreview(item?.cover)
    }
  }, [item?.cover])

  useEffect(() => {
    if (item?.isPrivate) {
      setValue('isPrivate', item?.isPrivate)
    }
  }, [item?.isPrivate])
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
    setValue,
    watch,
  }
}
