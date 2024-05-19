import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { updateSearchParams } from '@/pages/variables'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './modalOnAddDeck.module.scss'

import { useCreateDeckMutation } from '../../services/flashCardsAPI'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

const createDecksSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(1000),
})

// type FormValues = { cover?: File | null } & z.infer<typeof createDecksSchema>
type FormValues = z.infer<typeof createDecksSchema>

export const ModalOnAddDeck = ({ open, setOpen }: Props) => {
  const [checked, setChecked] = useState(false)
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(createDecksSchema),
  })

  useEffect(() => {
    if (cover) {
      setCover(cover)
    }
  }, [])

  const refInputImg = useRef<HTMLInputElement>(null)
  const [cover, setCover] = useState<File | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [createDeck] = useCreateDeckMutation()

  const onSubmit: SubmitHandler<FormValues> = data => {
    createDeck({ ...data, cover })
    console.log({ ...data, isPrivate: checked })
    console.log(cover)
    setOpen(false)
    updateSearchParams({
      currentPage: 1,
      itemsPerPage: 10,
      search: '',
      searchParams,
      setSearchParams,
    })
  }

  const hanldeSubmitImg = () => {
    refInputImg?.current?.click()
  }

  return (
    <Modal
      className={s.customClass}
      onOpenChange={() => setOpen(false)}
      open={open}
      title={'Add New Deck'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.body}>
          <div>{cover && <img alt={'cover'} src={URL.createObjectURL(cover)} />}</div>
          <FormTextfield
            className={s.input}
            control={control}
            label={'Type new Deck name'}
            name={'name'}
          />

          <Button className={s.uploadImg} fullWidth onClick={hanldeSubmitImg} type={'button'}>
            <ImageOutline className={s.icon} /> Upload IMG
            {/*<Input className={s.inputImg} id={'upload-photo'} name={'photo'} type={'file'} />*/}
            <Input
              accept={'image/*'}
              className={s.inputImg}
              name={'cover'}
              onChange={e => setCover(e.target.files?.[0] ?? null)}
              ref={refInputImg}
              type={'file'}
            />
          </Button>
          <Checkbox
            checked={checked}
            label={'Private pack'}
            onCheckedChange={() => setChecked(!checked)}
          />
        </div>
        <div className={s.footer}>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} type={'submit'}>
            Create deck
          </Button>
        </div>
      </form>
    </Modal>
  )
}

// Region
// type Props = {
//   open: boolean
//   setOpen: (value: boolean) => void
// }
//
// const createDecksSchema = z.object({
//   isPrivate: z.boolean(),
//   name: z.string().min(3).max(1000),
// })
//
// type FormValues = z.infer<typeof createDecksSchema>
//
// export const ModalOnAddDeck = ({ open, setOpen }: Props) => {
//   const [checked, setChecked] = useState(false)
//   const { control, handleSubmit } = useForm<FormValues>({
//     defaultValues: { isPrivate: false, name: '' },
//     resolver: zodResolver(createDecksSchema),
//   })
//
//   const refInputImg = useRef<HTMLInputElement>(null)
//   const [cover, setCover] = useState<File | null>(null)
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [createDeck] = useCreateDeckMutation()
//
//   const onSubmit: SubmitHandler<CreateDeckArgs> = data => {
//     createDeck({ ...data, cover: data.cover, name: data.name })
//     setOpen(false)
//     updateSearchParams({
//       currentPage: 1,
//       itemsPerPage: 10,
//       search: '',
//       searchParams,
//       setSearchParams,
//     })
//   }
//
//   const hanldeSubmitImg = () => {
//     refInputImg?.current?.click()
//   }
//
//   const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
//     console.log(e.target.files)
//     const file = e.target.files?.[0]
//
//     if (file) {
//       const reader = new FileReader()
//
//       reader.onload = () => {
//         const imgData = reader.result as string
//
//         setCover(imgData)
//       }
//       reader.readAsDataURL(file)
//     }
//   }
//
//   return (
//     <Modal
//       className={s.customClass}
//       onOpenChange={() => setOpen(false)}
//       open={open}
//       title={'Add New Deck'}
//     >
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className={s.body}>
//           <div></div>
//           <FormTextfield
//             className={s.input}
//             control={control}
//             label={'Type new Deck name'}
//             name={'name'}
//           />
//
//           <Button className={s.uploadImg} fullWidth onClick={hanldeSubmitImg} type={'button'}>
//             <ImageOutline className={s.icon} /> Upload IMG
//             {/*<Input className={s.inputImg} id={'upload-photo'} name={'photo'} type={'file'} />*/}
//             <Input
//               accept={'image/*'}
//               className={s.inputImg}
//               name={'cover'}
//               onChange={e => setCover(e.target.files?.[0] ?? null)}
//               ref={refInputImg}
//               type={'file'}
//             />
//           </Button>
//           <Checkbox
//             checked={checked}
//             label={'Private pack'}
//             onCheckedChange={() => setChecked(!checked)}
//           />
//         </div>
//         <div className={s.footer}>
//           <Button onClick={() => setOpen(false)} variant={'secondary'}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit(onSubmit)} type={'submit'}>
//             Create deck
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   )
// }
