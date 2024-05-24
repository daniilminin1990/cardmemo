import { SignIn } from '@/features/auth/ui/signIn/signIn'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Components/Auth/SignIn/SignIn',
} satisfies Meta<typeof SignIn>

export default meta

type Story = StoryObj<typeof meta>

export const SignInDefault: Story = {}
