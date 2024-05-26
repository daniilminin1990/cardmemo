import { ChangeEvent, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import LogOut from '@/assets/icons/svg/LogOut'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { TextField } from '@/common/components/textfield/textfield'
import Typography from '@/common/components/typography/typography'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateUserDataMutation,
} from '@/features/auth/api/authApi'
import { PersonalInfoFormValue, PersonalInfoScheme } from '@/features/auth/model/authZod.schemes'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './personalInfo.module.scss'

export const PersonalInfo = () => {
  const { control, handleSubmit } = useForm<PersonalInfoFormValue>({
    mode: 'onSubmit',
    resolver: zodResolver(PersonalInfoScheme),
  })

  const { data: me } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [updateUserData] = useUpdateUserDataMutation()

  const [isEditNickName, setEditNickName] = useState(false)

  const logoutHandler = async () => {
    await logout()
      .unwrap()
      .catch(() => {
        toast.error(`Error, try again or later`)
      })
  }
  const onSubmit: SubmitHandler<FieldValues> = data => {
    updateUserData({ name: data.nickName })
  }
  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && updateUserData({ avatar: e.target.files[0] })
  }

  const avatarFileInputRef = useRef<HTMLInputElement>(null)
  const uploadAvatarImgBtn = () => {
    avatarFileInputRef.current?.click()
  }

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Personal Information
            </Typography>
          </div>
          <div className={s.box}>
            <div className={s.imgGroup}>
              <img alt={''} className={s.img} src={me?.avatar} />
              {me && (
                <>
                  <Controller
                    control={control}
                    name={'avatar'}
                    render={({ field }) => (
                      <input
                        accept={'image/*'}
                        onChange={e => {
                          field.onChange(e)
                          changeAvatarHandler(e)
                        }}
                        ref={avatarFileInputRef}
                        style={{ display: 'none' }}
                        type={'file'}
                      />
                    )}
                  />

                  <Button
                    className={clsx(s.editIconButton, s.editIconButtonImg)}
                    onClick={uploadAvatarImgBtn}
                    type={'button'}
                    variant={'secondary'}
                  >
                    <Edit2Outline className={s.editIcon} />
                  </Button>
                </>
              )}
            </div>
            {!isEditNickName ? (
              <div className={s.profileEdit}>
                <Typography className={s.name} variant={'h1'}>
                  {me?.name}
                  <Button
                    className={clsx(s.editIconButton, s.editIconButtonTxt)}
                    onClick={() => setEditNickName(!isEditNickName)}
                  >
                    <Edit2Outline className={s.editIcon} />
                  </Button>
                </Typography>
                <Typography className={s.email} variant={'body2'}>
                  {me?.email}
                </Typography>
              </div>
            ) : (
              <>
                <TextField
                  className={s.inputStyle}
                  control={control}
                  label={'Nickname'}
                  name={'nickName'}
                  placeholder={'Type new nickname'}
                  type={'text'}
                />
              </>
            )}
          </div>
          <div className={clsx(s.buttonWrapper, isEditNickName && s.buttonWrapperEdit)}>
            {!isEditNickName ? (
              <Button
                className={s.logoutBtn}
                fullWidth={false}
                onClick={logoutHandler}
                variant={'secondary'}
              >
                <LogOut className={s.logoutIcon} />
                <Typography variant={'body2'}>Logout</Typography>
              </Button>
            ) : (
              <>
                <Button fullWidth>
                  <Typography variant={'body2'}>Save changes</Typography>
                </Button>
                <Button
                  fullWidth
                  onClick={() => setEditNickName(!isEditNickName)}
                  variant={'secondary'}
                >
                  <Typography variant={'body2'}>Cancel</Typography>
                </Button>
              </>
            )}
          </div>
        </form>
      </Card>
    </>
  )
}
