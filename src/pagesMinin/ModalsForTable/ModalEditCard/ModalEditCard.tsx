import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { DataFiller } from '@/pagesMinin/ModalsForTable/ModalEditCard/DataFiller/DataFiller'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './modalEditCardMinin.module.scss'

import { Card } from '../../../../services/decks/deck.types'

type ModalAddEditProps = {
  item?: Card
  open: boolean
  setOpen: (value: boolean) => void
}

export const ModalEditCard = (props: ModalAddEditProps) => {
  const { item, open, setOpen } = props
  const initPreviewQuestion = item ? item.questionImg ?? null : ''
  const initPreviewAnswer = item ? item.answerImg ?? null : ''
  const [previewQuestion, setPreviewQuestion] = useState<null | string>(initPreviewQuestion)
  const [previewAnswer, setPreviewAnswer] = useState<null | string>(initPreviewAnswer)
  const schema = z.object({
    answer: item ? z.string() : z.string().min(3).max(1000),
    question: item ? z.string() : z.string().min(3).max(1000),
  })

  type FormValues = z.infer<typeof schema>
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    // item && updateCard({ ...data, coverQuestion, id: item.id })
    console.log({ answerImg: previewAnswer, data: { ...data }, questionImg: previewQuestion })
    setOpen(false)
    setPreviewQuestion(null)
    setPreviewAnswer(null)
  }

  const handleOnClose = () => {
    if (item) {
      setPreviewQuestion(item.questionImg || null)
      setPreviewAnswer(item.answerImg || null)
    } else {
      setPreviewQuestion(null)
      setPreviewAnswer(null)
    }
    setOpen(false)
  }

  return (
    <Modal
      className={s.customClass}
      onOpenChange={handleOnClose}
      open={open}
      title={item ? 'Update Card' : 'Add New Card'}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.body}>
          <DataFiller
            control={control}
            item={item}
            name={'question'}
            preview={previewQuestion}
            setPreview={setPreviewQuestion}
            title={'Question'}
          />
          <DataFiller
            control={control}
            item={item}
            name={'answer'}
            preview={previewAnswer}
            setPreview={setPreviewAnswer}
            title={'Answer'}
          />
        </div>
        <div className={s.footer}>
          <Button onClick={handleOnClose} type={'button'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button
          // Не обязательное говно, т.к. по умолчанию onSubmit
          >
            <Typography variant={'subtitle2'}>{item ? 'Save changes' : 'Create Card'}</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
