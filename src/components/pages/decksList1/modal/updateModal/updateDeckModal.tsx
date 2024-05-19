import { ChangeEvent, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import { DeckProps } from '@/components/pages/decksList1/decks/decks.types'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { imageChangeHandler } from '@/components/utils/imageChange'
import { useUpdateDeckMutation } from '@/services/decks/decks.services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import s from './updateDeckModal.module.scss'

import defaultDeckImg from '../../../../../assets/img/defaultDeckImg.jpg'

type Props = {
  imagePreview: any
  item: DeckProps
  open: boolean
  setImagePreview: any
  setOpen: (open: boolean) => void
}

const UpdateDeckSchema = z.object({
  cover: z.instanceof(File).nullable().optional(),
  nameDeck: z.string().min(3, { message: 'Name must be 3 or more word' }),
  privatePack: z.boolean().optional(),
})

type FormValues = z.infer<typeof UpdateDeckSchema>

export const ModalUpdateDeck = ({ imagePreview, item, open, setImagePreview, setOpen }: Props) => {
  const [updateDeck, {}] = useUpdateDeckMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(UpdateDeckSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const formData = new FormData()

    console.log(data)
    formData.append('cover', data.cover ? data.cover : '')
    formData.append('name', data.nameDeck)
    formData.append('isPrivate', data.privatePack.toString())

    await updateDeck({
      formData,
      id: item.id,
    })
      .unwrap()
      .then(() => {
        setOpen(false)
        setImagePreview(defaultDeckImg)
        reset()
      })
      .catch((error: any) => {
        console.error('Error - deck not updated!', error)
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
    setValue('nameDeck', '')
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
          <div className={s.previewImg}>
            <img alt={'deck img'} src={imagePreview} {...control.register('cover')} />
          </div>
          <div className={s.coverBtns}>
            <Button fullWidth onClick={deleteImgBtnhandler} type={'button'} variant={'secondary'}>
              Delete Cover
            </Button>

            <input
              accept={'image/*'}
              onChangeCapture={changeImgHandler}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
            <Button fullWidth onClick={uploadImgBtn} type={'button'} variant={'secondary'}>
              <ImageOutline className={s.imageOutline} /> Change Cover
            </Button>
          </div>
          <div>
            <Input
              className={s.input}
              label={'Name Deck'}
              placeholder={'Name'}
              {...control.register('nameDeck')}
            />
            {errors.nameDeck && <p>{errors.nameDeck.message}</p>}
          </div>
          <Controller
            control={control}
            name={'privatePack'}
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
              Send
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
