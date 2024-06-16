import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import { Button } from '@/components/ui/button'
import { useAvatar } from '@/features/profile/lib/hooks/useAvatar'
import { MeResponse } from '@/services/auth/auth.types'

import s from './Avatar.module.scss'

type Props = {
  me?: MeResponse
}

export const Avatar = ({ me }: Props) => {
  const { avatarFileInputRef, changeAvatarHandler, myAvatar, uploadAvatarImgBtn } = useAvatar({
    me,
  })

  return (
    <div className={s.imgGroup}>
      <img alt={'My avatar'} className={s.img} src={myAvatar} />

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
  )
}
