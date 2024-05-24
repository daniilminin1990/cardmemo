import type { Meta, StoryObj } from '@storybook/react'

import Header from '@/app/ui/header/header'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Auth/Headers/Headers',
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const HeadersStory: Story = {
  args: {
    isAuth: true,
  },
}
