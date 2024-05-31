import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { initCurrentPage } from '@/common/globalVariables'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import FormCheckbox from '@/components/ui/form/form-checkbox'
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
    isPrivate: z.boolean().optional(),
    name: z.string().min(3).max(30),
  })

  type FormValues = z.infer<typeof schema>
  const [updateDeck] = useUpdateDeckMutation()
  const [createDeck] = useCreateDeckMutation()
  const [cover, setCover] = useState<File | null | undefined>(undefined)
  const initPreview = item ? item.cover ?? null : ''
  const [preview, setPreview] = useState<null | string>(initPreview)
  const refInputImg = useRef<HTMLInputElement>(null)
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { isPrivate: false, name: '' },
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
  }, [cover, preview])

  const handleOnClose = () => {
    item ? setPreview(item.cover || null) : setPreview(null)
    setOpen(false)
  }
  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files?.[0] ?? undefined)
    e.target.value = ''
  }
  const onSubmit: SubmitHandler<FormValues> = async data => {
    if (item && data.name === item.name) {
      handleToastInfo('This name already exists, please choose another one', 3000)

      return
    }

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
          {preview && <img alt={'cover'} src={preview} width={'100%'} />}
          <FormTextfield
            className={s.input}
            control={control}
            currentValue={item ? item?.name : ''}
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
              <Input
                accept={'image/*'}
                className={s.inputImg}
                name={'cover'}
                onChange={handleInputImg}
                ref={refInputImg}
                style={{ display: 'none' }}
                type={'file'}
              />
            </Button>
          </div>
          <FormCheckbox
            control={control}
            label={t('modalAddEditDeck.private')}
            name={'isPrivate'}
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
