import { useState } from 'react'

import { PersonalInfo } from '@/components/auth/PersonalInfo/PersonalInfo'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: PersonalInfo,
  tags: ['autodocs'],
  title: 'Components/Auth/PersonalInfo/PersonalInfo',
} satisfies Meta<typeof PersonalInfo>

export default meta

type Story = StoryObj<typeof meta>
export const PersonalInfoEdit: Story = () => {
  const [isEditNickname, setIsEditNickname] = useState<boolean>(true)
  const [nickName, setNickName] = useState('Ivan') // Need interaction with Form, to get values
  const email = 'j&johnson@gmail.com'
  // Need state to interact with avatar, also modal to change

  return (
    <PersonalInfo
      email={email}
      isEditNickname={isEditNickname}
      nickName={nickName}
      setIsEditNickname={setIsEditNickname}
      setNickName={setNickName}
    />
  )
}
