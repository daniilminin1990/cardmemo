import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import { BackBtn } from '@/components/ui/BackBtn/BackBtn'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { useNickName } from '@/features/profile/lib/hooks/useNickName'
import { LogoutBtn } from '@/features/profile/ui/logoutBtn/LogoutBtn'
import { MeResponse } from '@/services/auth/auth.types'

import s from './NickName.module.scss'

type Props = {
  isEditNickName: boolean
  me?: MeResponse
  setEditNickName: (name: boolean) => void
}

export const NickName = ({ isEditNickName, me, setEditNickName }: Props) => {
  const { backToDecksPage, t } = useNickName()

  return (
    <div className={s.profileEdit}>
      <Typography className={s.nameWithEdit} variant={'h1'}>
        {me?.name}
        <Button className={s.editNameBtn} onClick={() => setEditNickName(!isEditNickName)}>
          <Edit2Outline className={s.editNameIcon} />
        </Button>
      </Typography>

      <Typography className={s.email} variant={'body2'}>
        {me?.email}
      </Typography>

      <div className={s.backBtn}>
        <BackBtn to={backToDecksPage}>{t('profilePage.backDeckList')}</BackBtn>
      </div>

      <LogoutBtn />
    </div>
  )
}
