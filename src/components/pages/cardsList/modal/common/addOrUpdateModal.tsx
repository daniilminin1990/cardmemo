import { UploadImgBtn } from '@/components/pages/common/uploadImgBtn/uploadImgBtn'
import Input from '@/components/ui/Input/Input'
import Select from '@/components/ui/Select/Select'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'

import s from './addOrUpdateModal.module.scss'

import { addOrUpdateCardProps } from './addOrUpdateModal.types'
import { useAddOrUpdateModal } from './useAddOrUpdateModal'

export const AddOrUpdateModal = ({
  answerImgPreview,
  confirmBtnName,
  id,
  mutationCallBack,
  open,
  questionImgPreview,
  selectedFormat,
  setAnswerImgPreview,
  setOpen,
  setQuestionImgPreview,
  setSelectedFormat,
  title,
}: addOrUpdateCardProps) => {
  const {
    answerFileInputRef,
    changeAnswerImgHandler,
    changeQuestionImgHandler,
    control,
    errors,
    handleSubmit,
    hideModal,
    onSubmit,
    questionFileInputRef,
    setFormat,
    uploadAnswerImgBtn,
    uploadQuestionImgBtn,
  } = useAddOrUpdateModal({
    id,
    mutationCallBack,
    setAnswerImgPreview,
    setOpen,
    setQuestionImgPreview,
    setSelectedFormat,
  })

  return (
    <>
      <Modal className={s.modal} onOpenChange={hideModal} open={open} title={title}>
        <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
          <Typography>
            Choose a question format
            <Select
              itemsPerPageHandler={setFormat}
              placeholder={selectedFormat}
              selectOptions={[
                { text: 'Text', value: 'Text' },
                { text: 'Picture', value: 'Picture' },
              ]}
            />
          </Typography>
          <div>
            <Input className={s.input} label={'Question'} {...control.register('question')} />
            {errors.question && <p>{errors.question.message}</p>}
          </div>

          {selectedFormat === 'Picture' && (
            <>
              <div className={s.previewImg}>
                <img alt={'Question Image preview'} src={questionImgPreview} />
              </div>
              <UploadImgBtn
                changeImgHandler={changeQuestionImgHandler}
                control={control}
                fileInputRef={questionFileInputRef}
                name={'questionImg'}
                uploadImgBtn={uploadQuestionImgBtn}
              />
            </>
          )}
          <div>
            <Input className={s.input} label={'Answer'} {...control.register('answer')} />
            {errors.answer && <p>{errors.answer.message}</p>}
          </div>

          {selectedFormat === 'Picture' && (
            <>
              <div className={s.previewImg}>
                <img alt={'Answer Image preview'} src={answerImgPreview} />
              </div>
              <UploadImgBtn
                changeImgHandler={changeAnswerImgHandler}
                control={control}
                fileInputRef={answerFileInputRef}
                name={'answerImg'}
                uploadImgBtn={uploadAnswerImgBtn}
              />
            </>
          )}
          <div className={s.btns}>
            <Button onClick={hideModal} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              {confirmBtnName}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
