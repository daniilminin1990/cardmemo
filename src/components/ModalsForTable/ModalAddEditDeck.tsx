import { ChangeEvent } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

import ImageOutline from '@/assets/icons/svg/ImageOutline'
import { useAddEditDeckLogic } from '@/common/addEditCardsOrDecks/addEditDeckLogic'
import { getEditDeckNotifyMsg } from '@/common/addEditCardsOrDecks/getEditDeckNotifyMsg'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { initCurrentPage } from '@/common/globalVariables'
import { FormValuesAddEditDeck } from '@/common/zodSchemas/decks/decks.schemas'
import Input from '@/components/ui/Input/Input'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Modal } from '@/components/ui/modal/modal'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Deck } from '@/services/decks/deck.types'
import { useCreateDeckMutation, useUpdateDeckMutation } from '@/services/decks/decks.service'

import s from './modals.module.scss'

type ModalAddEditProps = {
  item?: Deck
  open: boolean
  setOpen: (value: boolean) => void
}

export const ModalAddEditDeck = (props: ModalAddEditProps) => {
  const { item, open, setOpen } = props
  const { clearQuery, setCurrentPageQuery } = useQueryParams()
  const { control, cover, handleSubmit, preview, refInputImg, setCover, setPreview } =
    useAddEditDeckLogic({
      item,
    })

  const [updateDeck, { isLoading: isLoadingUpdate }] = useUpdateDeckMutation()
  const [createDeck, { isLoading: isLoadingCreate }] = useCreateDeckMutation()

  const handleOnClose = () => {
    item ? setPreview(item.cover || null) : setPreview(null)
    setOpen(false)
  }
  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    // ! Этот коммент чтобы заменить первый useEffect
    // if (e.target.files !== null && e.target.files.length > 0) {
    //   setPreview(URL.createObjectURL(e.target.files[0]))
    // }
    // ! Это условие чтобы не давать сэтать одинаковые картинки и вследствии не отправлять на сервер
    setCover(
      cover?.lastModified === e.target.files?.[0].lastModified ||
        cover?.name === e.target.files?.[0].name
        ? null
        : e.target.files?.[0] ?? undefined
    )
    e.target.value = ''
  }
  const onSubmit: SubmitHandler<FormValuesAddEditDeck> = data => {
    if (item) {
      const msg = getEditDeckNotifyMsg({ data, item, preview })

      handleToastInfo(msg)
      updateDeck({ ...data, cover, id: item.id })
    } else {
      createDeck({ ...data, cover })
    }
    clearQuery()
    setCurrentPageQuery(Number(initCurrentPage))
    setOpen(false)
    setCover(undefined)
  }
  const handleSubmitImg = () => {
    refInputImg?.current?.click()
  }

  const loadingStatus = isLoadingCreate || isLoadingUpdate

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Modal
        className={s.customClass}
        onOpenChange={handleOnClose}
        open={open}
        title={item ? 'Update Deck' : 'Add New Deck'}
      >
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.body}>
            {item?.name && <Typography variant={'h1'}>{item.name}</Typography>}
            {/*{preview && <img alt={'cover'} src={preview} width={'100%'} />}*/}
            {preview && <img alt={'cover'} src={preview} width={'100%'} />}
            <FormTextfield
              className={s.input}
              control={control}
              currentValue={item ? item?.name : ''}
              label={item ? 'Edit title' : 'Type new Deck name'}
              name={'name'}
            />
            <div className={s.buttonsWrapper}>
              {preview && (
                <Button
                  className={s.uploadImg}
                  fullWidth
                  onClick={() => {
                    setPreview(null)
                    setCover(null)
                  }}
                  type={'button'}
                >
                  <Typography variant={'subtitle2'}>Remove cover</Typography>
                </Button>
              )}
              <Button className={s.uploadImg} fullWidth onClick={handleSubmitImg} type={'button'}>
                <ImageOutline className={s.icon} />
                <Typography variant={'subtitle2'}>
                  {preview ? 'Change cover' : 'Upload Image'}
                </Typography>
                {/*<Input className={s.inputImg} id={'upload-photo'} name={'photo'} type={'file'} />*/}
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
            <Controller
              control={control}
              defaultValue={false}
              name={'isPrivate'}
              render={({ field: { onChange, value = item?.isPrivate } }) => (
                <Checkbox checked={value} label={'Is Private'} onCheckedChange={onChange} />
              )}
            />
          </div>
          <div className={s.footer}>
            <Button onClick={handleOnClose} type={'button'} variant={'secondary'}>
              <Typography variant={'subtitle2'}>Cancel</Typography>
            </Button>
            <Button>
              <Typography variant={'subtitle2'}>{item ? 'Save changes' : 'Create Pack'}</Typography>
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
