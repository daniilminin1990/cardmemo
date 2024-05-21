import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './modalEditCardMinin.module.scss'

import { Card } from '../../../services/decks/deck.types'

type ModalAddEditProps = {
  item?: Card
  open: boolean
  setOpen: (value: boolean) => void
}

export const ModalEditCard = (props: ModalAddEditProps) => {
  const { item, open, setOpen } = props
  const schema = z.object({
    question: item ? z.string() : z.string().min(3).max(1000),
  })

  type FormValues = z.infer<typeof schema>
  // const [updateDeck] = useUpdateDeckMutation()
  const [coverQuestion, setCover] = useState<File | null>(null)
  const initPreviewQuestion = item ? item.questionImg ?? null : ''
  const [previewQuestion, setPreviewQuestion] = useState<null | string>(initPreviewQuestion)
  const refInputImg = useRef<HTMLInputElement>(null)
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { question: '' },
    resolver: zodResolver(schema),
  })

  // useEffect(() => {
  //   if (item?.cover) {
  //     setPreview(item?.cover)
  //   }
  // }, [item?.cover])

  // Генерируем ссылку на загружаемый файл и сэтаем в preview, который будем отображать, и очищаем после сэта хэш
  useEffect(() => {
    if (coverQuestion) {
      const newPreviewQuestion = URL.createObjectURL(coverQuestion)

      if (previewQuestion) {
        URL.revokeObjectURL(previewQuestion)
      }

      setPreviewQuestion(newPreviewQuestion)

      return () => URL.revokeObjectURL(newPreviewQuestion)
    }
  }, [coverQuestion])

  const handleOnClose = () => {
    item ? setPreviewQuestion(item.questionImg || null) : setPreviewQuestion(null)
    setOpen(false)
  }
  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.files', e.target.files)
    // if (e.target.files !== null && e.target.files.length > 0) {
    //   setPreviewQuestion(URL.createObjectURL(e.target.files[0]))
    // }
    setCover(e.target.files?.[0] ?? null)
  }
  const onSubmit: SubmitHandler<FormValues> = data => {
    // item && updateCard({ ...data, coverQuestion, id: item.id })
    console.log(data)
    setOpen(false)
  }
  const hanldeSubmitImg = () => {
    refInputImg?.current?.click()
  }

  return (
    <Modal
      className={s.customClass}
      onOpenChange={handleOnClose}
      open={open}
      title={item ? 'Update Card' : 'Add New Card'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.body}>
          <Typography variant={'subtitle2'}>Question</Typography>
          <FormTextfield
            className={s.input}
            control={control}
            label={item ? 'Edit question' : 'Question'}
            name={'question'}
          />
          {previewQuestion && (
            <img alt={'cover'} className={s.img} src={previewQuestion} width={'50%'} />
          )}
          {item?.question && (
            <Typography className={s.questionTxt} variant={'h1'}>
              {item.question}
            </Typography>
          )}
          {item && previewQuestion && (
            <Button
              className={clsx(s.uploadImg, previewQuestion && s.removeImg)}
              fullWidth
              onClick={() => {
                setPreviewQuestion(null)
                setCover(null)
              }}
              type={'button'}
            >
              <Typography variant={'subtitle2'}>Remove cover</Typography>
            </Button>
          )}
          <Button className={s.uploadImg} fullWidth onClick={hanldeSubmitImg} type={'button'}>
            <ImageOutline className={s.icon} />
            <Typography variant={'subtitle2'}>
              {previewQuestion ? 'Change cover' : 'Upload Image'}
            </Typography>
            {/*<Input className={s.inputImg} id={'upload-photo'} name={'photo'} type={'file'} />*/}
            <Input
              accept={'image/*'}
              className={s.inputImg}
              name={'cover'}
              onChange={handleInputImg}
              ref={refInputImg}
              type={'file'}
            />
          </Button>
        </div>
        <div className={s.footer}>
          <Button onClick={handleOnClose} type={'button'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button
          // onSubmit={handleSubmit(onSubmit)} Не обязательное говно, т.к. по умолчанию onSubmit
          >
            <Typography variant={'subtitle2'}>{item ? 'Save changes' : 'Create Card'}</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
