import { useState } from 'react'

import { PersonalInfo } from '@/app/ui/personalInfo/personalInfo'
import { Meta } from '@storybook/react'

const meta = {
  component: PersonalInfo,
  tags: ['autodocs'],
  title: 'Components/Auth/personalInfo/personalInfo',
} satisfies Meta<typeof PersonalInfo>

export default meta

// type Story = StoryObj<typeof meta>
export const PersonalInfoEdit = () => {
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
