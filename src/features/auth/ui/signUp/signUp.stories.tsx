import type { Meta, StoryObj } from '@storybook/react'

import SignUp from '@/features/auth/ui/signUp/signUp'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Components/Auth/SignUp/SignUp',
} satisfies Meta<typeof SignUp>

export default meta

type Story = StoryObj<typeof meta>

export const SignUpStory: Story = {
  render: () => {
    return <SignUp />
  },
}
