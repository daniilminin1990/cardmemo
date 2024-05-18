import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { updateSearchParams } from '@/pages/variables'

import s from './modalOnAddDeck.module.scss'

import { CreateDeckArgs } from '../../services/decks/deck.types'
import { useCreateDeckMutation } from '../../services/flashCardsAPI'

// type Props = {
//   open: boolean
//   setOpen: (value: boolean) => void
// }
//
// export const ModalOnAddDeck = ({ open, setOpen }: Props) => {
//   const [checked, setChecked] = useState(false)
//   const { control, handleSubmit } = useForm<{ name: string }>({
//     defaultValues: { name: '' },
//   })
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [createDeck] = useCreateDeckMutation()
//
//   // interface IFormInput {name: string}
//   // и эту типизацию в useForm<IFormInput>
//   // SubmitHandler<IFormInput> от RHF
//   // const onSubmit: SubmitHandler<IFormInput> = data => console.log(data)
//
//   const onSubmit = handleSubmit(data => {
//     createDeck(data)
//     updateSearchParams({
//       currentPage: 1,
//       itemsPerPage: 10,
//       search: '',
//       searchParams,
//       setSearchParams,
//     })
//     setOpen(false)
//   })
//
//   return (
//     <Modal
//       className={s.customClass}
//       onOpenChange={() => setOpen(false)}
//       open={open}
//       title={'Add New Deck'}
//     >
//       <form onSubmit={onSubmit}>
//         <div className={s.body}>
//           <FormTextfield
//             className={s.input}
//             control={control}
//             label={'Type new Deck name'}
//             name={'name'}
//           />
//
//           <label className={s.uploadImg} htmlFor={'upload-photo'} tabIndex={0}>
//             <ImageOutline className={s.icon} /> Upload IMG
//             <Input className={s.inputImg} id={'upload-photo'} name={'photo'} type={'file'} />
//           </label>
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
//           <Button onClick={onSubmit} type={'submit'}>
//             Create deck
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   )
// }

// Region

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

interface IFormInput {
  name: string
}

export const ModalOnAddDeck = ({ open, setOpen }: Props) => {
  const [checked, setChecked] = useState(false)
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: { name: '' },
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [createDeck] = useCreateDeckMutation()
  const onSubmit: SubmitHandler<IFormInput> = (data: CreateDeckArgs) => {
    createDeck(data)
    setOpen(false)
    updateSearchParams({
      currentPage: 1,
      itemsPerPage: 10,
      search: '',
      searchParams,
      setSearchParams,
    })
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
          <FormTextfield
            className={s.input}
            control={control}
            label={'Type new Deck name'}
            name={'name'}
          />

          <label className={s.uploadImg} htmlFor={'upload-photo'} tabIndex={0}>
            <ImageOutline className={s.icon} /> Upload IMG
            <Input className={s.inputImg} id={'upload-photo'} name={'photo'} type={'file'} />
          </label>
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
