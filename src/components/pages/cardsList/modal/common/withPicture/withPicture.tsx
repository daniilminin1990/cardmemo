import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { UploadImgBtn } from '@/components/pages/common/uploadImgBtn/uploadImgBtn'
import { Button } from '@/components/ui/button'

import s from './withPicture.module.scss'

type Props = {
  changeImgHandler: any
  control: any
  deleteImgBtnhandler: () => void
  fileInputRef: any
  imgPreview: any
  name: any
  uploadImgBtn: () => void
}

export const WithPicture = ({
  changeImgHandler,
  control,
  deleteImgBtnhandler,
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
          <Button fullWidth onClick={deleteImgBtnhandler} type={'button'} variant={'secondary'}>
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
