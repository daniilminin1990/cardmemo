import { ChangeEvent } from 'react'
import { Control } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import { useAddEditCardLogic } from '@/common/addEditCardsOrDecks/addEditCardLogic'
import { FormValuesAddEditCard } from '@/common/zodSchemas/cards/cards.schemas'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { CardResponse } from '@/services/cards/cards.types'
import { cardsActions } from '@/services/cardsSlice/cardsSlice'
import { useAppDispatch } from '@/services/store'

import s from './dataFiller.module.scss'

type DataFillerProps = {
  control: Control<FormValuesAddEditCard, any>
  img: null | string | undefined
  item?: CardResponse
  label: keyof FormValuesAddEditCard
  questionOrAnswer: string | undefined
}
export const DataFiller = (props: DataFillerProps) => {
  const { item, label, questionOrAnswer, ...rest } = props
  const dispatch = useAppDispatch()

  const { control, cover, preview, refInputImg, setCover, setPreview } = useAddEditCardLogic({
    control: rest.control,
    img: rest.img,
    item,
    label,
  })

  const title = label.charAt(0).toUpperCase() + label.slice(1)

  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    // ! Этот коммент чтобы заменить первый useEffect
    // if (e.target.files !== null && e.target.files.length > 0) {
    //   setPreview(URL.createObjectURL(e.target.files[0]))
    // }
    // ! Это условие чтобы не давать сэтать одинаковые картинки и вследствии не отправлять на сервер
    const newCover =
      cover?.lastModified === e.target.files?.[0].lastModified ||
      cover?.name === e.target.files?.[0].name
        ? null
        : e.target.files?.[0] ?? undefined

    setCover(newCover)
    label === 'question'
      ? dispatch(cardsActions.setQuestionImg({ questionImg: newCover }))
      : dispatch(cardsActions.setAnswerImg({ answerImg: newCover }))
    e.target.value = ''
  }
  const handleSubmitImg = () => {
    refInputImg?.current?.click()
  }

  const handleRemoveImgs = () => {
    label === 'question'
      ? dispatch(cardsActions.setPreviewQuestion({ previewQuestion: null }))
      : dispatch(cardsActions.setPreviewAnswer({ previewAnswer: null }))
    setPreview(null)
    setCover(null)
  }

  return (
    <div>
      <Typography variant={'subtitle2'}>{title}</Typography>
      <FormTextfield
        className={s.input}
        control={control}
        currentValue={label === 'question' ? item?.question : item?.answer}
        label={item ? `Edit ${label}` : title}
        name={label}
      />
      {preview && (
        <div className={s.imgWrapper}>
          <img alt={'cover'} className={s.img} src={preview} />
        </div>
      )}
      {questionOrAnswer && (
        <Typography className={s.questionTxt} variant={'h1'}>
          {questionOrAnswer}
        </Typography>
      )}
      <div className={s.buttonsWrapper}>
        {preview && (
          <Button className={s.uploadImg} fullWidth onClick={handleRemoveImgs} type={'button'}>
            <Typography variant={'subtitle2'}>Remove cover</Typography>
          </Button>
        )}
        <Button className={s.uploadImg} fullWidth onClick={handleSubmitImg} type={'button'}>
          <ImageOutline className={s.icon} />
          <Typography variant={'subtitle2'}>{preview ? 'Change cover' : 'Upload Image'}</Typography>
          <Input
            accept={'image/*'}
            className={s.inputImg}
            name={'cover'}
            onChange={handleInputImg}
            ref={refInputImg}
            style={{ display: 'none' }}
            type={'file'}
          />
        </Button>
      </div>
    </div>
  )
}
