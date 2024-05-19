import { ChangeEvent, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { UploadImgBtn } from '@/components/pages/common/uploadImgBtn/uploadImgBtn'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { Modal } from '@/components/ui/modal/modal'
import { imageChangeHandler } from '@/components/utils/imageChange'
import { useAddDeckMutation } from '@/services/decks/decks.services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import s from './addDeckModal.module.scss'

import defaultDeckImg from '../../../../../assets/img/defaultDeckImg.jpg'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const addDeckSchema = z.object({
  avatar: z.instanceof(File).optional(),
  nameDeck: z.string().min(3, { message: 'Name must be 3 or more word' }),
  privatePack: z.boolean().optional(),
})

type FormValues = z.infer<typeof addDeckSchema>

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
  } = useForm({ resolver: zodResolver(addDeckSchema) })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const formData = new FormData()

    console.log(data)
    formData.append('cover', data.avatar)
    formData.append('name', data.nameDeck)
    formData.append('isPrivate', data.privatePack.toString())

    addDeck(formData)
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
      fieldName: 'avatar',
      setImagePreview: setImagePreview,
      setValue,
    })
  }

  const hideModal = () => {
    setOpen(false)
    setImagePreview(defaultDeckImg)
    setValue('nameDeck', '')
  }
  const uploadImgBtn = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      {/*<DevTool control={control} />*/}
      <Modal className={s.modal} onOpenChange={hideModal} open={open} title={'Add New Deck'}>
        <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              className={s.input}
              label={'Name Deck'}
              placeholder={'Name'}
              {...control.register('nameDeck')}
            />
            {errors.nameDeck && <p>{errors.nameDeck.message}</p>}
          </div>

          <div className={s.previewImg}>
            <img alt={'Image preview'} src={imagePreview} />
          </div>
          <div>
            <UploadImgBtn
              changeImgHandler={changeImgHandler}
              control={control}
              fileInputRef={fileInputRef}
              name={'avatar'}
              uploadImgBtn={uploadImgBtn}
            />
          </div>
          <Controller
            control={control}
            defaultValue={false}
            name={'privatePack'}
            render={({ field: { onChange, value } }) => (
              <Checkbox checked={value} label={'privatePack'} onCheckedChange={onChange} />
            )}
          />
          <div className={s.btns}>
            <Button onClick={hideModal} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Add New Pack
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
