import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './modals.module.scss'

import { Deck } from '../../../services/decks/deck.types'
import { useUpdateDeckMutation } from '../../../services/flashCardsAPI'

type Props = {
  item: Deck
  open: boolean
  setOpen: (value: boolean) => void
}

// type FormValues = {
//   cover?: string
//   id: string
//   isPrivate?: boolean
//   name: string
// }

const updateDecksSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(1000),
})

type FormValues = z.infer<typeof updateDecksSchema>
export const ModalUpdateDeck = (props: Props) => {
  const { item, open, setOpen } = props
  const [updateDeck] = useUpdateDeckMutation()
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState<null | string>('')
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(updateDecksSchema),
  })

  useEffect(() => {
    if (item?.cover) {
      setPreview(item?.cover)
    }
  }, [item?.cover])

  // Генерируем ссылку на загружаемый файл
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
  const onSubmit: SubmitHandler<FormValues> = data => {
    updateDeck({ ...data, id: item.id })
    setOpen(false)
  }

  return (
    <Modal onOpenChange={() => setOpen(false)} open={open} title={'Update Deck'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.body}>
          <div>
            <Typography variant={'h1'}>{item.name}</Typography>
            <div>{preview && <img alt={'cover'} src={preview.toString()} width={200} />}</div>
            <FormTextfield
              className={s.input}
              control={control}
              label={'Edit title'}
              name={'name'}
            />
          </div>
          {/*{cover && (*/}
          {/*  <Button*/}
          {/*    onClick={() => {*/}
          {/*      setPreview(null)*/}
          {/*      setCover(null)*/}
          {/*    }}*/}
          {/*    type={'button'}*/}
          {/*  >*/}
          {/*    Remove cover*/}
          {/*  </Button>*/}
          {/*)}*/}
        </div>
        <div className={s.footer}>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button
            // onSubmit={handleSubmit(onSubmit)} Не обязательное говно, т.к. по умолчанию onSubmit
            variant={'primary'}
          >
            Apply
          </Button>
        </div>
      </form>
    </Modal>
  )
}

// Region БЕЗ ФОРМЫ (работает только без передачи картинок)
// type Props = {
//   item: Deck
//   open: boolean
//   setOpen: (value: boolean) => void
// }
// export const ModalUpdateDeck = (props: Props) => {
//   const { item, open, setOpen } = props
//   const [updTitle, setUpdTitle] = useState<string>(item.name)
//   const [updateDeck] = useUpdateDeckMutation()
//   const onChangeDeckHandler = () => {
//     updateDeck({ id: item.id, name: updTitle })
//     setOpen(false)
//   }
//
//   return (
//     <Modal onOpenChange={() => setOpen(false)} open={open} title={'Update Deck'}>
//       <div className={s.body}>
//         <div>
//           <Typography variant={'h1'}>{item.name}</Typography>
//           <Input
//             className={s.input}
//             label={'Edit title'}
//             onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdTitle(e.target.value)}
//             placeholder={'Type new title here'}
//             value={item.name}
//           />
//         </div>
//         <div>{item.cover}</div>
//       </div>
//       <div className={s.footer}>
//         <Button onClick={() => setOpen(false)} variant={'secondary'}>
//           Cancel
//         </Button>
//         <Button onClick={onChangeDeckHandler} variant={'primary'}>
//           Apply
//         </Button>
//       </div>
//     </Modal>
//   )
// }
