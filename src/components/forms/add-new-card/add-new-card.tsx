import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import defImg from '@/assets/img/defaultCard.jpg'
import {
  AddNewCardFormType,
  useAddNewCardForm,
} from '@/components/forms/add-new-card/use-add-new-card'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormPreviewFileUploader } from '@/components/ui/form/form-preview-file-uploader/form-preview-file-uploader'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'

import s from './add-new-card.module.scss'

type AddNewCardFormDV = {
  cover: null | string
} & AddNewCardFormType

type Props = {
  defaultValues?: AddNewCardFormDV
  onSubmit: (data: FormData) => void
  setOpenModal: (open: boolean) => void
}

export const AddNewCard = ({ defaultValues, setOpenModal }: Props) => {
  const [downloaded, setDownloaded] = useState<null | string>(defaultValues?.cover || null)
  const [coverError, setCoverError] = useState<null | string>(null)

  const values: AddNewCardFormType = {
    answerName: defaultValues?.answerName || '',
    questionName: defaultValues?.questionName || '',
  }

  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useAddNewCardForm(values)

  const deleteCoverHandler = (cover: 'coverAnswer' | 'coverQuestion') => {
    if (coverError) {
      setCoverError(null)
    }
    // toast.warning('You deleted cover', { containerId: 'modal' })
    setValue(cover, null)
    setDownloaded(null)
  }

  const extraActions = async (cover: 'coverAnswer' | 'coverQuestion') => {
    const success = await trigger(cover)
    const { error } = getFieldState(cover)
    const file = watch(cover)

    if (!success && error?.message) {
      // toast.error(error.message, { containerId: 'modal' })
      setCoverError(error.message)
      resetField(cover)
    }

    if (file) {
      const badCase = defaultValues?.cover ?? null
      const img = success ? URL.createObjectURL(file) : badCase

      setDownloaded(img)

      if (coverError && !error?.message) {
        setCoverError(null)
      }
    }
  }

  const onSubmit: SubmitHandler<AddNewCardFormType> = data => console.log(data)

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.box}>
          <Typography as={'h5'} className={s.typographyHead} variant={'subtitle2'}>
            Question:
          </Typography>
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={'Question?'}
            name={'questionName'}
            placeholder={'Name'}
            type={'text'}
          />
          <img alt={defImg} src={defImg} />
          <Button className={s.uploadImg} fullWidth variant={'secondary'}>
            <ImageOutline className={s.icon} /> Change Image
          </Button>
        </div>
        <div className={s.box}>
          <Typography as={'h5'} className={s.typographyHead} variant={'subtitle2'}>
            Answer:
          </Typography>
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={'Answer?'}
            name={'answerName'}
            placeholder={'Name'}
            type={'text'}
          />
          <FormPreviewFileUploader
            control={control}
            deleteCoverHandler={() => deleteCoverHandler('coverAnswer')}
            errorMessage={coverError}
            extraActions={() => extraActions('coverAnswer')}
            name={'coverAnswer'}
            preview={downloaded}
          />
        </div>
        <div className={s.footer}>
          <Button onClick={() => setOpenModal(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={() => setOpenModal(false)} variant={'primary'}>
            Add New Pack
          </Button>
        </div>
      </form>
    </>
  )
}
