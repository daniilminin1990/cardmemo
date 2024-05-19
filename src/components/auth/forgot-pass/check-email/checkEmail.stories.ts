import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/components/auth/forgot-pass/check-email/checkEmail'

const meta = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Components/Auth/ForgotPassword/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
