import { ChangeEvent, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import LogOut from '@/assets/icons/svg/LogOut'
import { PersonalInfoFormValue, PersonalInfoScheme } from '@/common/zodSchemas/auth/auth.schemas'
import { BackBtn } from '@/components/ui/BackBtn/BackBtn'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { path } from '@/router/path'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateUserDataMutation,
} from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './ProfilePage.module.scss'

import defaultAvatar from '../../assets/img/defaultAvatar.png'

export const ProfilePage = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<PersonalInfoFormValue>({
    mode: 'onSubmit',
    resolver: zodResolver(PersonalInfoScheme),
  })

  const deckQuery = localStorage.getItem('deckQuery') ? `/${localStorage.getItem('deckQuery')}` : ''

  const { data: me, isFetching, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [updateUserData, { isLoading: isUpdateLoading }] = useUpdateUserDataMutation()

  const [isEditNickName, setEditNickName] = useState(false)

  const logoutHandler = async () => {
    await logout()
  }
  const onSubmit: SubmitHandler<FieldValues> = data => {
    updateUserData({ name: data.nickName }).then(() => {
      setEditNickName(false)
    })
  }
  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && updateUserData({ avatar: e.target.files[0] })
  }

  const avatarFileInputRef = useRef<HTMLInputElement>(null)
  const uploadAvatarImgBtn = () => {
    avatarFileInputRef.current?.click()
  }

  const loadingStatus = isLoading || isUpdateLoading || isFetching

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Typography as={'h1'} className={s.title} variant={'h1'}>
              {t('profilePage.personalInfo')}
            </Typography>
          </div>

          <div className={s.box}>
            <div className={s.imgGroup}>
              <img alt={'My avatar'} className={s.img} src={me?.avatar || defaultAvatar} />

              {me && (
                <>
                  <input
                    accept={'image/*'}
                    onChange={e => {
                      changeAvatarHandler(e)
                    }}
                    ref={avatarFileInputRef}
                    style={{ display: 'none' }}
                    type={'file'}
                  />
                  <Button
                    className={s.editAvatarBtn}
                    onClick={uploadAvatarImgBtn}
                    type={'button'}
                    variant={'secondary'}
                  >
                    <Edit2Outline className={s.editAvatarIcon} />
                  </Button>
                </>
              )}
            </div>

            {!isEditNickName ? (
              <div className={s.profileEdit}>
                <Typography className={s.nameWithEdit} variant={'h1'}>
                  {me?.name}
                  <Button
                    className={s.editNameBtn}
                    onClick={() => setEditNickName(!isEditNickName)}
                  >
                    <Edit2Outline className={s.editNameIcon} />
                  </Button>
                </Typography>

                <Typography className={s.email} variant={'body2'}>
                  {me?.email}
                </Typography>

                <div className={s.backBtn}>
                  <BackBtn to={path.decks + deckQuery}>{t('profilePage.backDeckList')}</BackBtn>
                </div>

                <Button
                  as={Link}
                  className={s.logoutBtn}
                  onClick={logoutHandler}
                  to={`${path.login}`}
                >
                  <LogOut className={s.logoutIcon} />
                  <Typography variant={'body2'}>{t('profilePage.logout')}</Typography>
                </Button>
              </div>
            ) : (
              <div className={s.nameEditWrapper}>
                <FormTextfield
                  className={s.inputStyle}
                  control={control}
                  currentValue={me?.name}
                  label={t('profilePage.nickname')}
                  name={'nickName'}
                  placeholder={'Type new nickname'}
                  type={'text'}
                />
                <Button fullWidth>
                  <Typography variant={'body2'}>{t('profilePage.saveChanges')}</Typography>
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </>
  )
}
