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

export const PersonalInfoDefault: Story = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  return <PersonalInfo isEdit={isEdit} />
}

export const PersonalInfoEdit: Story = () => {
  const [isEdit, setIsEdit] = useState<boolean>(true)

  return <PersonalInfo isEdit={isEdit} />
}
