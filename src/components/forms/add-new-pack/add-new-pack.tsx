import { Controller } from 'react-hook-form'

import {
  AddNewPackFormType,
  useAddNewPackForm,
} from '@/components/forms/add-new-pack/use-add-new-pack'
import { useUploadImg } from '@/components/forms/hooks/use-upload-img'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormPreviewFileUploader } from '@/components/ui/form/form-preview-file-uploader/form-preview-file-uploader'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'

import s from './add-new-pack.module.scss'

type AddNewPackFormDV = {
  cover: null | string
} & AddNewPackFormType

type Props = {
  defaultValues?: AddNewPackFormDV
  onSubmit: (data: FormData) => void
  setOpenModal: (open: boolean) => void
}

export const AddNewPack = ({ defaultValues, onSubmit, setOpenModal }: Props) => {
  const values: AddNewPackFormType = {
    isPrivatePack: defaultValues?.isPrivatePack || false,
    packName: defaultValues?.packName || '',
  }

  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useAddNewPackForm(values)

  const {
    coverError: packCoverError,
    deleteCoverHandler: packDeleteCoverHandler,
    downloaded: packDownloaded,
    extraActions: packExtraActions,
  } = useUploadImg<AddNewPackFormType>({
    defaultCover: defaultValues?.cover,
    getFieldState,
    name: 'coverPack',
    resetField,
    setValue,
    trigger,
    watch,
  })

  const fileAnswerIsDirty = getFieldState('coverPack').isDirty
  const fileAnswer = watch('coverPack')

  const sendHandler = (data: AddNewPackFormType) => {
    const form = new FormData()

    form.append('packName', data.packName)

    form.append('isPrivatePack', `${data.isPrivatePack}`)

    if (fileAnswer === null) {
      form.append('coverPack', '')
    } else if (fileAnswerIsDirty && data.coverPack) {
      form.append('coverPack', data.coverPack)
    }

    onSubmit(form)

    //for test
    for (const pair of form.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }

    setOpenModal(false)
  }

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}
      <form className={s.form} onSubmit={handleSubmit(sendHandler)}>
        <div className={s.box}>
          <FormTextfield
            className={s.inputStyle}
            control={control}
            label={'Name Pack'}
            name={'packName'}
            placeholder={'Name'}
            type={'text'}
          />
          <FormPreviewFileUploader
            className={s.uploadImg}
            control={control}
            deleteCoverHandler={packDeleteCoverHandler}
            errorMessage={packCoverError}
            extraActions={packExtraActions}
            name={'coverPack'}
            preview={packDownloaded}
          />
          <div className={s.checkbox}>
            <Controller
              control={control}
              defaultValue={false}
              name={'isPrivatePack'}
              render={({ field: { onChange, value } }) => (
                <Checkbox checked={value} label={'Private Pack'} onCheckedChange={onChange} />
              )}
            />
          </div>
        </div>
        <div className={s.footer}>
          <Button onClick={() => setOpenModal(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'} variant={'primary'}>
            Add New Pack
          </Button>
        </div>
      </form>
    </>
  )
}
