import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Control } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormTextfield } from '@/components/ui/form/form-textfield'

import s from './dataFiller.module.scss'

import { Card } from '../../../../../services/decks/deck.types'

type DataFillerProps = {
  control: Control<any, any>
  item?: Card
  name: string
  preview: null | string
  setPreview: (value: null | string) => void
  title: string
}
export const DataFiller = (props: DataFillerProps) => {
  const { control, item, name, preview, setPreview, title } = props
  // const [updateDeck] = useUpdateDeckMutation()
  const [cover, setCover] = useState<File | null>(null)
  const refInputImg = useRef<HTMLInputElement>(null)

  // Генерируем ссылку на загружаемый файл и сэтаем в preview, который будем отображать, и очищаем после сэта хэш
  useEffect(() => {
    if (cover) {
      const newPreviewQuestion = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }

      setPreview(newPreviewQuestion)

      return () => URL.revokeObjectURL(newPreviewQuestion)
    }
  }, [cover])

  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files !== null && e.target.files.length > 0) {
    //   setPreview(URL.createObjectURL(e.target.files[0]))
    // }
    setCover(e.target.files?.[0] ?? null)
  }
  const hanldeSubmitImg = () => {
    refInputImg?.current?.click()
  }

  return (
    <div>
      <Typography variant={'subtitle2'}>{title}</Typography>
      <FormTextfield
        className={s.input}
        control={control}
        label={item ? 'Edit question' : title}
        name={name}
      />
      {preview && (
        <div className={s.imgWrapper}>
          <img alt={'cover'} className={s.img} src={preview} />
        </div>
      )}
      {item?.question && (
        <Typography className={s.questionTxt} variant={'h1'}>
          {item.question}
        </Typography>
      )}
      <Button className={s.uploadImg} fullWidth onClick={hanldeSubmitImg} type={'button'}>
        <ImageOutline className={s.icon} />
        <Typography variant={'subtitle2'}>{preview ? 'Change cover' : 'Upload Image'}</Typography>
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
  )
}
