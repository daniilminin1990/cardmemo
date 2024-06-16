import { ChangeEvent, useRef } from 'react'

import defaultAvatar from '@/assets/img/defaultAvatar.png'
import { useUpdateUserDataMutation } from '@/services/auth/auth.service'
import { MeResponse } from '@/services/auth/auth.types'

type Props = {
  me?: MeResponse
}

export const useAvatar = ({ me }: Props) => {
  const [updateUserData] = useUpdateUserDataMutation()

  const avatarFileInputRef = useRef<HTMLInputElement>(null)

  const uploadAvatarImgBtn = () => {
    avatarFileInputRef.current?.click()
  }
  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && updateUserData({ avatar: e.target.files[0] })
  }

  const myAvatar = me?.avatar || defaultAvatar

  return {
    avatarFileInputRef,
    changeAvatarHandler,
    myAvatar,
    uploadAvatarImgBtn,
  }
}
