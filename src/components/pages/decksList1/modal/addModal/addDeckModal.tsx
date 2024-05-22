import { ChangeEvent, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { UploadImgBtn } from '@/components/pages/common/uploadImgBtn/uploadImgBtn'
import { addUpdateDeckSchema } from '@/components/pages/decksList1/modal/addUpdateModalSchema'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { Modal } from '@/components/ui/modal/modal'
import { imageChangeHandler } from '@/components/utils/imageChange'
import { useAddDeckMutation } from '@/services/decks/decks.services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addDeckModal.module.scss'

import defaultDeckImg from '../../../../../assets/img/defaultDeckImg.jpg'

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
  } = useForm({ resolver: zodResolver(addUpdateDeckSchema) })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { cover, isPrivate, name } = data

    addDeck({ cover, isPrivate, name })
      .unwrap()
      .then(() => {
        setOpen(false)
        setImagePreview(defaultDeckImg)
        reset()
      })
      .catch(error => {
        console.error('Error - deck not added!', error)
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
  const deleteImgBtnhandler = () => {
    setImagePreview(defaultDeckImg)
  }

  return (
    <>
      <DevTool control={control} />
      <Modal className={s.modal} onOpenChange={hideModal} open={open} title={'Edit Deck'}>
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
              <Button fullWidth onClick={deleteImgBtnhandler} type={'button'} variant={'secondary'}>
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
