import { ChangeEvent } from 'react'
import { Control, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'

type Props = {
  changeImgHandler: (e: ChangeEvent<HTMLInputElement>) => void
  control: Control
  fileInputRef: any
  name: string
  uploadImgBtn: () => void
}

export const UploadImgBtn = ({
  changeImgHandler,
  control,
  fileInputRef,
  name,
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
        Upload Image
      </Button>
    </>
  )
}
