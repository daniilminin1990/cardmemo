import { ChangeEvent, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import LogOut from '@/assets/icons/svg/LogOut'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { useNavigation } from '@/components/utils/hooks/useNavigate'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateUserDataMutation,
} from '@/services/auth/auth.services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './personalInfo.module.scss'

const createNewPassScheme = z.object({
  avatar: z.unknown().optional().nullable(),
  nickName: z.string().min(1, 'Type new nickname'),
})

type FormValue = z.infer<typeof createNewPassScheme>

export const PersonalInfo = () => {
  const { control, handleSubmit, setValue } = useForm<FormValue>({
    mode: 'onSubmit',
    resolver: zodResolver(createNewPassScheme),
  })
  const { goTo } = useNavigation()
  const [logout] = useLogoutMutation()
  const logoutHandler = () => {
    logout().then(() => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      goTo('/login')
    })
  }
  const [updateUserData] = useUpdateUserDataMutation()
  const [isEditNickName, setEditNickName] = useState(false)
  const { data: me } = useMeQuery()
  const onSubmit: SubmitHandler<FormValue> = data => {
    console.log(data)

    updateUserData({ name: data.nickName })
  }
  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateUserData({ avatar: e.target.files[0] })
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
                <Typography variant={'h1'}>
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
                <FormTextfield
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
              <Button fullWidth={false} onClick={logoutHandler} variant={'secondary'}>
                <Typography variant={'body2'}>
                  <LogOut className={s.logoutIcon} />
                  Logout
                </Typography>
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
