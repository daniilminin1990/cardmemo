import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/features/auth/ui/checkEmail/checkEmail'

const meta = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Components/Auth/RecoverPassword/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
