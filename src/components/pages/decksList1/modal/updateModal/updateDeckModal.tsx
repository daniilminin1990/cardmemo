import { ChangeEvent, useRef } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { UploadImgBtn } from '@/components/pages/common/uploadImgBtn/uploadImgBtn'
import { DeckProps } from '@/components/pages/decksList1/decks/decks.types'
import { addUpdateDeckSchema } from '@/components/pages/decksList1/modal/addUpdateModalSchema'
import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { Modal } from '@/components/ui/modal/modal'
import { imageChangeHandler } from '@/components/utils/imageChange'
import { useUpdateDeckMutation } from '@/services/decks/decks.services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './updateDeckModal.module.scss'

import defaultDeckImg from '../../../../../assets/img/defaultDeckImg.jpg'

type Props = {
  imagePreview: any
  item: DeckProps
  open: boolean
  setImagePreview: any
  setOpen: (open: boolean) => void
}

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
    resolver: zodResolver(addUpdateDeckSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const { cover, isPrivate, name } = data

    await updateDeck({ cover, id: item.id, isPrivate, name })
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
              Send
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
