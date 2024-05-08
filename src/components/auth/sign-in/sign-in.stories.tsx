import { BrowserRouter } from 'react-router-dom'

import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'

import { SignIn } from './sign-in'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Components/Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta

type Story = StoryObj<typeof meta>

export const SignInDefault: Story = {}
