import { ChangeEvent, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './modalsMinin.module.scss'

import { Deck } from '../../../services/decks/deck.types'
import { useUpdateDeckMutation } from '../../../services/decks/decks.service'

type Props = {
  item: Deck
  open: boolean
  setOpen: (value: boolean) => void
}

const updateDecksSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string(),
})

type FormValues = z.infer<typeof updateDecksSchema>

export const ModalUpdateDeck = (props: Props) => {
  const { item, open, setOpen } = props
  const [checked, setChecked] = useState(false)
  const [updateDeck] = useUpdateDeckMutation()
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState<null | string>(item.cover ?? null)
  const refInputImg = useRef<HTMLInputElement>(null)
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(updateDecksSchema),
  })

  // useEffect(() => {
  //   if (item?.cover) {
  //     setPreview(item?.cover)
  //   }
  // }, [item?.cover])
  //
  // // Генерируем ссылку на загружаемый файл и сэтаем в preview, который будем отображать
  // useEffect(() => {
  //   if (cover) {
  //     const newPreview = URL.createObjectURL(cover)
  //
  //     if (preview) {
  //       URL.revokeObjectURL(preview)
  //     }
  //
  //     setPreview(newPreview)
  //
  //     return () => URL.revokeObjectURL(newPreview)
  //   }
  // }, [cover])

  const handleOnClose = () => {
    setPreview(item.cover ?? null)
    setOpen(false)
  }

  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
    setCover(e.target.files?.[0] ?? null)
  }

  const onSubmit: SubmitHandler<FormValues> = data => {
    updateDeck({ ...data, cover, id: item.id })
    // console.log({ ...data, cover, id: item.id })
    setOpen(false)
  }

  const hanldeSubmitImg = () => {
    refInputImg?.current?.click()
  }

  return (
    <Modal className={s.customClass} onOpenChange={handleOnClose} open={open} title={'Update Deck'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.body}>
          {item.name && <Typography variant={'h1'}>{item.name}</Typography>}
          {/*{preview && <img alt={'cover'} src={preview} width={'100%'} />}*/}
          {preview && <img alt={'cover'} src={preview} width={'100%'} />}
          <FormTextfield className={s.input} control={control} label={'Edit title'} name={'name'} />
          {preview && (
            <Button
              className={clsx(s.uploadImg, preview && s.removeImg)}
              fullWidth
              onClick={() => {
                setPreview(null)
                setCover(null)
              }}
              type={'button'}
            >
              <Typography variant={'subtitle2'}>Remove cover</Typography>
            </Button>
          )}
          <Button className={s.uploadImg} fullWidth onClick={hanldeSubmitImg} type={'button'}>
            <ImageOutline className={s.icon} />
            <Typography variant={'subtitle2'}>Change cover</Typography>
            {/*<Input className={s.inputImg} id={'upload-photo'} name={'photo'} type={'file'} />*/}
            <Input
              accept={'image/*'}
              className={s.inputImg}
              name={'cover'}
              onChange={handleInputImg}
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
          <Button onClick={handleOnClose} type={'button'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button
          // onSubmit={handleSubmit(onSubmit)} Не обязательное говно, т.к. по умолчанию onSubmit
          >
            <Typography variant={'subtitle2'}>Save changes</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
