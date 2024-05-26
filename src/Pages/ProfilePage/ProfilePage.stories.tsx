import { useState } from 'react'

import { ProfilePage } from '@/Pages/ProfilePage/ProfilePage'
import { Meta } from '@storybook/react'

const meta = {
  component: ProfilePage,
  tags: ['autodocs'],
  title: 'Components/Auth/PersonalInfo/PersonalInfo',
} satisfies Meta<typeof ProfilePage>

export default meta

// type Story = StoryObj<typeof meta>
export const PersonalInfoEdit = () => {
  const [isEditNickname, setIsEditNickname] = useState<boolean>(true)
  const [nickName, setNickName] = useState('Ivan') // Need interaction with Form, to get values
  const email = 'j&johnson@gmail.com'
  // Need state to interact with avatar, also modal to change

  return (
    <ProfilePage
      email={email}
      isEditNickname={isEditNickname}
      nickName={nickName}
      setIsEditNickname={setIsEditNickname}
      setNickName={setNickName}
    />
  )
}
