import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { useProfilePage } from '@/features/profile/lib/hooks/useProfilePage'
import { Avatar } from '@/features/profile/ui/avatar/Avatar'
import { NickName } from '@/features/profile/ui/nickName/NickName'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const { control, handleSubmit, isEditNickName, loadingStatus, me, onSubmit, setEditNickName, t } =
    useProfilePage()

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
            <Avatar me={me} />

            {!isEditNickName ? (
              <NickName isEditNickName={isEditNickName} me={me} setEditNickName={setEditNickName} />
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
