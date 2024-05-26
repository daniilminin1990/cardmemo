import { ChangeEvent, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/common/components/button'
import Checkbox from '@/common/components/checkbox/checkbox'
import Input from '@/common/components/input/input'
import { Modal } from '@/common/components/modal/modal'
import { UploadImgBtn } from '@/common/components/uploadImgBtn/uploadImgBtn'
import { imageChangeHandler } from '@/common/utils/imageChange'
import { useAddDeckMutation } from '@/features/decksList/api/decksApi'
import {
  AddUpdateDeckFormValues,
  AddUpdateDeckSchema,
} from '@/features/decksList/model/decksZod.schemes'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addDeckModal.module.scss'

import defaultDeckImg from '../../../../assets/img/defaultDeckImg.jpg'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const ModalAddDeck = ({ open, setOpen }: Props) => {
  const [addDeck, {}] = useAddDeckMutation()

  const [imagePreview, setImagePreview] = useState(defaultDeckImg)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddUpdateDeckFormValues>({ resolver: zodResolver(AddUpdateDeckSchema) })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data)
    const { cover, isPrivate, name } = data

    addDeck({ cover, isPrivate, name })
      .unwrap()
      .then(() => {
        setOpen(false)
        toast.success('Deck added')
        setImagePreview(defaultDeckImg)
        reset()
      })
      .catch(() => {
        toast.error(`Error, adding failed`)
      })
  }

  const changeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    imageChangeHandler({
      e,
      fieldName: 'cover',
      setImagePreview: setImagePreview,
      setValue,
    })
  }

  const hideModal = () => {
    setOpen(false)
    setImagePreview(defaultDeckImg)
    setValue('name', '')
  }
  const uploadImgBtn = () => {
    fileInputRef.current?.click()
  }
  const deleteImgBtnHandler = () => {
    setImagePreview(defaultDeckImg)
  }

  return (
    <>
      {/*<DevTool control={control} />*/}
      <Modal className={s.modal} onOpenChange={hideModal} open={open} title={'Add Deck'}>
        <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              className={s.input}
              label={'Name Deck'}
              placeholder={'Name'}
              {...control.register('name')}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className={s.previewImg}>
            <img alt={'deck img'} src={imagePreview} />
          </div>

          <div className={s.coverBtns}>
            {defaultDeckImg !== imagePreview && (
              <Button fullWidth onClick={deleteImgBtnHandler} type={'button'} variant={'secondary'}>
                Delete Cover
              </Button>
            )}
            <UploadImgBtn
              changeImgHandler={changeImgHandler}
              control={control}
              fileInputRef={fileInputRef}
              name={'cover'}
              title={`${defaultDeckImg !== imagePreview ? 'Change' : 'Upload'}` + ' Cover'}
              uploadImgBtn={uploadImgBtn}
            />
          </div>

          <Controller
            control={control}
            name={'isPrivate'}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                label={'Private Pack'}
                onCheckedChange={checked => {
                  onChange(checked)
                }}
              />
            )}
          />

          <div className={s.confirmBtns}>
            <Button onClick={hideModal} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Add Deck
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
