import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'

import s from './modalOnAddDeck.module.scss'

type Props = {
  onSubmit: (data: any) => void
  open: boolean
  setOpen: (value: boolean) => void
}
export const ModalOnAddDeck = ({ onSubmit, open, setOpen }: Props) => {
  const [checked, setChecked] = useState(false)
  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit(data)
    setOpen(false)
  })

  return (
    <Modal
      className={s.customClass}
      onOpenChange={() => setOpen(false)}
      open={open}
      title={'Add New Deck'}
    >
      <form onSubmit={onSubmit}>
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
          <Button onClick={onSubmitHandler} type={'submit'}>
            Create deck
          </Button>
        </div>
      </form>
    </Modal>
  )
}
