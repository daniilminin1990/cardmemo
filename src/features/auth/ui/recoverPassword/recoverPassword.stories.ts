import type { Meta, StoryObj } from '@storybook/react'

import { RecoverPassword } from '@/features/auth/ui/recoverPassword/recoverPassword'

const meta = {
  component: RecoverPassword,
  tags: ['autodocs'],
  title: 'Components/Auth/RecoverPassword',
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
