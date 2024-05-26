import { ChangeEvent, LegacyRef } from 'react'
import { Control } from 'react-hook-form'

import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { Button } from '@/common/components/button'
import { UploadImgBtn } from '@/common/components/uploadImgBtn/uploadImgBtn'

import s from './withPicture.module.scss'

type Props = {
  changeImgHandler: (e: ChangeEvent<HTMLInputElement>) => void
  control: Control<any>
  deleteImgBtnHandler: () => void
  fileInputRef: LegacyRef<HTMLInputElement> | undefined
  imgPreview: string
  name: string
  uploadImgBtn: () => void
}

export const WithPicture = ({
  changeImgHandler,
  control,
  deleteImgBtnHandler,
  fileInputRef,
  imgPreview,
  name,
  uploadImgBtn,
}: Props) => {
  return (
    <>
      <div className={s.previewImg}>
        <img alt={'Image preview'} src={imgPreview} />
      </div>
      <div className={s.coverBtns}>
        {defaultDeckImg !== imgPreview && (
          <Button fullWidth onClick={deleteImgBtnHandler} type={'button'} variant={'secondary'}>
            Delete Cover
          </Button>
        )}
        <UploadImgBtn
          changeImgHandler={changeImgHandler}
          control={control}
          fileInputRef={fileInputRef}
          name={name}
          title={`${defaultDeckImg !== imgPreview ? 'Change' : 'Upload'}` + ' Cover'}
          uploadImgBtn={uploadImgBtn}
        />
      </div>
    </>
  )
}
