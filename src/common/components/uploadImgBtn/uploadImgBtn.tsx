import { ChangeEvent, LegacyRef } from 'react'
import { Control, Controller } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import { Button } from '@/common/components/button'

import s from './uploadImgBtn.module.scss'

type Props = {
  changeImgHandler: (e: ChangeEvent<HTMLInputElement>) => void
  control: Control<any>
  fileInputRef: LegacyRef<HTMLInputElement> | undefined
  name: string
  title: string
  uploadImgBtn: () => void
}

export const UploadImgBtn = ({
  changeImgHandler,
  control,
  fileInputRef,
  name,
  title,
  uploadImgBtn,
}: Props) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            accept={'image/*'}
            onChange={e => {
              field.onChange(e)
              changeImgHandler(e)
            }}
            ref={fileInputRef}
            style={{ display: 'none' }}
            type={'file'}
          />
        )}
      />

      <Button fullWidth onClick={uploadImgBtn} type={'button'} variant={'secondary'}>
        <ImageOutline className={s.imageOutline} /> {title}
      </Button>
    </>
  )
}
