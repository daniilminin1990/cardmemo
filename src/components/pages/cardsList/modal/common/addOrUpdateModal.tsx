import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { WithPicture } from '@/components/pages/cardsList/modal/common/withPicture/withPicture'
import { UploadImgBtn } from '@/components/pages/common/uploadImgBtn/uploadImgBtn'
import Input from '@/components/ui/Input/Input'
import Select from '@/components/ui/Select/Select'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { DevTool } from '@hookform/devtools'

import s from './addOrUpdateModal.module.scss'

import { useAddOrUpdateModal } from './useAddOrUpdateModal'
type Props = {
  answerImgPreview: string
  confirmBtnName: string
  id: string | undefined
  mutationCallBack: any
  open: boolean
  questionImgPreview: string
  selectedFormat: 'Picture' | 'Text'
  setAnswerImgPreview: (answerImg: string) => void
  setOpen: (open: boolean) => void
  setQuestionImgPreview: (questionImg: string) => void
  setSelectedFormat: (variant: 'Picture' | 'Text') => void
  title: string
}
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
}: Props) => {
  const {
    answerFileInputRef,
    changeAnswerImgHandler,
    changeQuestionImgHandler,
    control,
    deleteImgBtnhandler,
    errors,
    handleSubmit,
    hideModal,
    onSubmit,
    questionFileInputRef,
    setFormat,
    uploadImgBtn,
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
      <DevTool control={control} />
      <Modal className={s.modal} onOpenChange={hideModal} open={open} title={title}>
        <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
          <Typography>
            Choose a question format
            <Select
              onValueChange={setFormat}
              selectOptions={[
                { text: 'Text', value: 'Text' },
                { text: 'Picture', value: 'Picture' },
              ]}
              value={selectedFormat}
            />
          </Typography>
          <div>
            <Input className={s.input} label={'Question'} {...control.register('question')} />
            {errors.question && <p>{errors.question.message}</p>}
          </div>

          {selectedFormat === 'Picture' && (
            <WithPicture
              changeImgHandler={changeQuestionImgHandler}
              control={control}
              deleteImgBtnhandler={() => deleteImgBtnhandler('question')}
              fileInputRef={questionFileInputRef}
              imgPreview={questionImgPreview}
              name={'questionImg'}
              uploadImgBtn={() => uploadImgBtn('question')}
            />
          )}
          <div>
            <Input className={s.input} label={'Answer'} {...control.register('answer')} />
            {errors.answer && <p>{errors.answer.message}</p>}
          </div>

          {selectedFormat === 'Picture' && (
            <WithPicture
              changeImgHandler={changeAnswerImgHandler}
              control={control}
              deleteImgBtnhandler={() => deleteImgBtnhandler('answer')}
              fileInputRef={answerFileInputRef}
              imgPreview={answerImgPreview}
              name={'answerImg'}
              uploadImgBtn={() => uploadImgBtn('answer')}
            />
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
