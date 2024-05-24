import { Button } from '@/common/components/button'
import Input from '@/common/components/input/input'
import { Modal } from '@/common/components/modal/modal'
import Select from '@/common/components/select/select'
import Typography from '@/common/components/typography/typography'
import { FormatItemProps } from '@/common/types/common.types'
import { useAddOrUpdateModal } from '@/features/cardsList/ui/addUpdateCardModal/useAddUpdateCardModal'
import { WithPicture } from '@/features/cardsList/ui/withPicture/withPicture'

import s from './addUpdateCardModal.module.scss'

type Props = {
  answerImgPreview: string
  confirmBtnName: string
  id: string
  mutationCallBack: any
  open: boolean
  questionImgPreview: string
  selectedFormat: 'Picture' | 'Text'
  setAnswerImgPreview: (answerImg: string) => void
  setOpen: (open: boolean) => void
  setQuestionImgPreview: (questionImg: string) => void
  setSelectedFormat: (variant: FormatItemProps) => void
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
    deleteImgBtnHandler,
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
      {/*<DevTool control={control} />*/}
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
              deleteImgBtnHandler={() => deleteImgBtnHandler('question')}
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
              deleteImgBtnHandler={() => deleteImgBtnHandler('answer')}
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
