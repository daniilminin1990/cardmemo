import { ChangeEvent, useRef } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import Checkbox from '@/common/components/checkbox/checkbox'
import Input from '@/common/components/input/input'
import { Modal } from '@/common/components/modal/modal'
import { UploadImgBtn } from '@/common/components/uploadImgBtn/uploadImgBtn'
import { imageChangeHandler } from '@/common/utils/imageChange'
import { useUpdateDeckMutation } from '@/features/decksList/api/decksApi'
import { DeckResponse } from '@/features/decksList/model/decks.types'
import {
  AddUpdateDeckFormValues,
  AddUpdateDeckSchema,
} from '@/features/decksList/model/decksZod.schemes'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './updateDeckModal.module.scss'

import defaultDeckImg from '../../../../assets/img/defaultDeckImg.jpg'

type Props = {
  imagePreview: string
  item: DeckResponse
  open: boolean
  setImagePreview: (file: string) => void
  setOpen: (open: boolean) => void
}

export const ModalUpdateDeck = ({ imagePreview, item, open, setImagePreview, setOpen }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddUpdateDeckFormValues>({
    resolver: zodResolver(AddUpdateDeckSchema),
  })

  const [updateDeck, {}] = useUpdateDeckMutation()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const { cover, isPrivate, name } = data

    await updateDeck({ cover, id: item.id, isPrivate, name })
      .unwrap()
      .then(() => {
        setOpen(false)
        setImagePreview(defaultDeckImg)
        reset()
      })
      .catch(() => {
        console.error('Error - deck not updated!')
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
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
