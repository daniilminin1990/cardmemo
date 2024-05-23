import {
  AddNewCardFormType,
  useAddNewCardForm,
} from '@/components/forms/add-new-card/use-add-new-card'
import { useUploadImg } from '@/components/forms/hooks/use-upload-img'
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

export const AddNewCard = ({ defaultValues, onSubmit, setOpenModal }: Props) => {
  const values: AddNewCardFormType = {
    answerName: defaultValues?.answerName || '',
    questionName: defaultValues?.questionName || '',
  }

  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useAddNewCardForm(values)

  const {
    coverError: answerCoverError,
    deleteCoverHandler: answerDeleteCoverHandler,
    downloaded: answerDownloaded,
    extraActions: answerExtraActions,
  } = useUploadImg<AddNewCardFormType>({
    defaultCover: defaultValues?.cover,
    getFieldState,
    name: 'coverAnswer',
    resetField,
    setValue,
    trigger,
    watch,
  })

  const {
    coverError: questionCoverError,
    deleteCoverHandler: questionDeleteCoverHandler,
    downloaded: questionDownloaded,
    extraActions: questionExtraActions,
  } = useUploadImg<AddNewCardFormType>({
    defaultCover: defaultValues?.cover,
    getFieldState,
    name: 'coverQuestion',
    resetField,
    setValue,
    trigger,
    watch,
  })

  const fileAnswerIsDirty = getFieldState('coverAnswer').isDirty
  const fileQuestionIsDirty = getFieldState('coverQuestion').isDirty
  const fileAnswer = watch('coverAnswer')
  const fileQuestion = watch('coverQuestion')

  const sendHandler = (data: AddNewCardFormType) => {
    const form = new FormData()

    form.append('answerName', data.answerName)
    form.append('questionName', data.questionName)

    if (fileAnswer === null) {
      form.append('coverAnswer', '')
    } else if (fileAnswerIsDirty && data.coverAnswer) {
      form.append('coverAnswer', data.coverAnswer)
    }

    if (fileQuestion === null) {
      form.append('coverQuestion', '')
    } else if (fileQuestionIsDirty && data.coverQuestion) {
      form.append('coverQuestion', data.coverQuestion)
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
          <FormPreviewFileUploader
            control={control}
            deleteCoverHandler={questionDeleteCoverHandler}
            errorMessage={questionCoverError}
            extraActions={questionExtraActions}
            name={'coverQuestion'}
            preview={questionDownloaded}
          />
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
            deleteCoverHandler={answerDeleteCoverHandler}
            errorMessage={answerCoverError}
            extraActions={answerExtraActions}
            name={'coverAnswer'}
            preview={answerDownloaded}
          />
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
