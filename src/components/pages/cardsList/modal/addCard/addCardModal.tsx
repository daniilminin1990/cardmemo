import { ChangeEvent, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import Input from '@/components/ui/Input/Input'
import Select from '@/components/ui/Select/Select'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { imageChangeHandler } from '@/components/utils/imageChange'
import { useAddCardMutation } from '@/services/cards/cards.services'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import s from './addCardModal.module.scss'

type Props = {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
}

const addCardSchema = z.object({
  answer: z.string().min(3, { message: 'Answer is required' }),
  answerImg: z.unknown().optional(),
  answerVideo: z.string().optional(),
  question: z.string().min(3, { message: 'Question must be 3 or more word' }),
  questionImg: z.unknown().optional(),
  questionVideo: z.string().optional(),
})

type FormValues = z.infer<typeof addCardSchema>

export const ModalAddCard = ({ id, open, setOpen }: Props) => {
  const [addCard] = useAddCardMutation()
  const [selectedFormat, setSelectedFormat] = useState<string>('Text')
  const [answerImgPreview, setAnswerImgPreview] = useState(defaultDeckImg)
  const [questionImgPreview, setQuestionImgPreview] = useState(defaultDeckImg)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(addCardSchema) })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { answer, answerImg, answerVideo, question, questionImg, questionVideo } = data

    addCard({ answer, answerImg, answerVideo, id, question, questionImg, questionVideo })
      .unwrap()
      .then(() => {
        setOpen(false)
        setQuestionImgPreview(defaultDeckImg)
        setAnswerImgPreview(defaultDeckImg)
        reset()
      })
      .catch(error => {
        console.error('Error - deck not added!', error)
      })
  }
  const hideModal = () => {
    setQuestionImgPreview(defaultDeckImg)
    setAnswerImgPreview(defaultDeckImg)
    setSelectedFormat('Text')
    setOpen(false)
    reset()
  }

  const changeQuestionImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    imageChangeHandler({
      e,
      fieldName: 'questionImg',
      setImagePreview: setQuestionImgPreview,
      setValue,
    })
  }
  const changeAnswerImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    imageChangeHandler({
      e,
      fieldName: 'answerImg',
      setImagePreview: setAnswerImgPreview,
      setValue,
    })
  }
  const setFormat = (variant: 'Picture' | 'Text') => {
    setValue('questionFormat', variant)
    setSelectedFormat(variant)
  }
  const questionFileInputRef = useRef<HTMLInputElement>(null)
  const uploadQuestionImgBtn = () => {
    questionFileInputRef.current?.click()
  }
  const answerFileInputRef = useRef<HTMLInputElement>(null)
  const uploadAnswerImgBtn = () => {
    answerFileInputRef.current?.click()
  }

  return (
    <>
      {/*<DevTool control={control} />*/}
      <Modal className={s.modal} onOpenChange={hideModal} open={open} title={'Add New Card'}>
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

              <Controller
                control={control}
                name={'questionImg'}
                render={({ field }) => (
                  <input
                    accept={'image/*'}
                    onChange={e => {
                      field.onChange(e)
                      changeQuestionImgHandler(e)
                    }}
                    ref={questionFileInputRef}
                    style={{ display: 'none' }}
                    type={'file'}
                  />
                )}
              />
              <Button
                fullWidth
                onClick={uploadQuestionImgBtn}
                type={'button'}
                variant={'secondary'}
              >
                Upload Image
              </Button>
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

              <Controller
                control={control}
                name={'answerImg'}
                render={({ field }) => (
                  <input
                    accept={'image/*'}
                    onChange={e => {
                      field.onChange(e)
                      changeAnswerImgHandler(e)
                    }}
                    ref={answerFileInputRef}
                    style={{ display: 'none' }}
                    type={'file'}
                  />
                )}
              />
              <Button fullWidth onClick={uploadAnswerImgBtn} type={'button'} variant={'secondary'}>
                Upload Image
              </Button>
            </>
          )}
          <div className={s.btns}>
            <Button onClick={hideModal} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Add New Card
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
