import { useState } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import defImg from '@/assets/img/defaultCard.jpg'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormFileUploader } from '@/components/ui/form/form-file-uploader'
import { clsx } from 'clsx'

import s from './form-preview-file-uploader.module.scss'

type Props<T extends FieldValues> = {
  control: Control<T>
  deleteCoverHandler: () => void
  displayInlineError?: boolean
  errorMessage: null | string
  extraActions?: () => void
  name: FieldPath<T>
  preview: null | string
}

export const FormPreviewFileUploader = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    deleteCoverHandler,
    displayInlineError = false,
    errorMessage,
    extraActions,
    name,
    preview,
  } = props

  const [open, setOpen] = useState(false)

  const imgClasses = clsx(s.image, preview && s.hover, open && s.open)

  const onClickHandler = () => {
    if (preview) {
      setOpen(prevState => !prevState)
    }
  }

  const deleteHandler = () => {
    deleteCoverHandler()
    if (open) {
      setOpen(false)
    }
  }

  return (
    <div className={s.root}>
      <img alt={'img'} className={imgClasses} onClick={onClickHandler} src={preview ?? defImg} />
      {displayInlineError && errorMessage && (
        <Typography className={s.error} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
      <div className={s.previewControls}>
        {preview && (
          <Button
            className={s.uploadImg}
            fullWidth
            onClick={deleteHandler}
            type={'button'}
            variant={'secondary'}
          >
            <ImageOutline className={s.imgIcon} /> Change Image
          </Button>
        )}
        <FormFileUploader
          control={control}
          extraActions={extraActions}
          fullWidth={!preview}
          name={name}
          variant={'secondary'}
        >
          <ImageOutline className={s.imgIcon} />
          Change Cover
        </FormFileUploader>
      </div>
    </div>
  )
}
