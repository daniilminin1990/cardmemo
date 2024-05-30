import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import { initCurrentPage } from '@/common/globalVariables'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Deck } from '@/services/decks/deck.types'
import { useCreateDeckMutation, useUpdateDeckMutation } from '@/services/decks/decks.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './modals.module.scss'

type ModalAddEditProps = {
  item?: Deck
  open: boolean
  setOpen: (value: boolean) => void
}

export const ModalAddEditDeck = (props: ModalAddEditProps) => {
  const { item, open, setOpen } = props
  const { clearQuery, setCurrentPageQuery } = useQueryParams()
  const { t } = useTranslation()
  const schema = z.object({
    isPrivate: z.boolean(),
    name: item ? z.string().min(3).max(30) : z.string().min(3).max(30),
    rememberMe: z.boolean().optional(),
  })

  type FormValues = z.infer<typeof schema>
  // const [checked, setChecked] = useState(false)
  const [updateDeck] = useUpdateDeckMutation()
  const [createDeck] = useCreateDeckMutation()
  const [cover, setCover] = useState<File | null | undefined>(undefined)
  const initPreview = item ? item.cover ?? null : ''
  const [preview, setPreview] = useState<null | string>(initPreview)
  const refInputImg = useRef<HTMLInputElement>(null)
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { isPrivate: false, name: '', rememberMe: true },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (item?.cover) {
      setPreview(item?.cover)
    }
  }, [item?.cover])

  // Генерируем ссылку на загружаемый файл и сэтаем в preview, который будем отображать, и очищаем после сэта хэш
  useEffect(() => {
    if (cover) {
      const newPreview = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }

      setPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
  }, [cover])

  const handleOnClose = () => {
    item ? setPreview(item.cover || null) : setPreview(null)
    setOpen(false)
  }
  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files?.[0] ?? undefined)
    e.target.value = ''
  }
  const onSubmit: SubmitHandler<FormValues> = async data => {
    await (item ? updateDeck({ ...data, cover, id: item.id }) : createDeck({ ...data, cover }))
    clearQuery()
    setCurrentPageQuery(Number(initCurrentPage))
    setOpen(false)
    setCover(undefined)
  }
  const hanldeSubmitImg = () => {
    refInputImg?.current?.click()
  }

  return (
    <Modal
      className={s.customClass}
      onOpenChange={handleOnClose}
      open={open}
      title={item ? `${t('modalAddEditDeck.updateDeck')}` : `${t('modalAddEditDeck.addNewDeck')}`}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.body}>
          {item?.name && <Typography variant={'h1'}>{item.name}</Typography>}
          {/*{preview && <img alt={'cover'} src={preview} width={'100%'} />}*/}
          {preview && <img alt={'cover'} src={preview} width={'100%'} />}
          <FormTextfield
            className={s.input}
            control={control}
            label={
              item ? `${t('modalAddEditDeck.editTitle')}` : `${t('modalAddEditDeck.nameDeck')}`
            }
            name={'name'}
          />
          <div className={s.buttonsWrapper}>
            {preview && (
              <Button
                className={s.uploadImg}
                fullWidth
                onClick={() => {
                  setPreview(null)
                  setCover(null)
                }}
                type={'button'}
              >
                <Typography variant={'subtitle2'}>{t('modalAddEditDeck.removeCover')}</Typography>
              </Button>
            )}
            <Button className={s.uploadImg} fullWidth onClick={hanldeSubmitImg} type={'button'}>
              <ImageOutline className={s.icon} />
              <Typography variant={'subtitle2'}>
                {preview
                  ? `${t('modalAddEditDeck.changeCover')}`
                  : `${t('modalAddEditDeck.uploadImage')}`}
              </Typography>
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
          </div>
          <Controller
            control={control}
            defaultValue={false}
            name={'isPrivate'}
            render={({ field: { onChange, value = item?.isPrivate } }) => (
              <Checkbox
                checked={value}
                label={t('modalAddEditDeck.private')}
                onCheckedChange={onChange}
              />
            )}
          />
        </div>
        <div className={s.footer}>
          <Button onClick={handleOnClose} type={'button'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>{t('modalAddEditDeck.cancel')}</Typography>
          </Button>
          <Button>
            <Typography variant={'subtitle2'}>
              {item
                ? `${t('modalAddEditDeck.saveChanges')}`
                : `${t('modalAddEditDeck.createPack')}`}
            </Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
