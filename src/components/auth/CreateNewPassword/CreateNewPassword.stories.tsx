import { CreateNewPassword } from '@/components/auth/CreateNewPassword/CreateNewPassword'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Components/Auth/CreateNewPassword/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta

type Story = StoryObj<typeof meta>

export const CreateNewPasswordDefault: Story = {}
