import type { Meta, StoryObj } from '@storybook/react'

import Header from './Header'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Auth/Headers/Headers',
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const HeadersStory: Story = {
  args: {
    data: {
      avatar: 'Ведро коня',
      created: '222. 124.15',
      email: 'string@mail.ru',
      id: 'sdfsdfsdfd',
      isEmailVerified: true,
      name: 'Сентябрь Утка',
      updated: '222. 124.15',
    },
  },
}
