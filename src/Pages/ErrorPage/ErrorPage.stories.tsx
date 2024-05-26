import type { Meta, StoryObj } from '@storybook/react'

import ErrorPage from '@/Pages/ErrorPage/ErrorPage'

const meta = {
  component: ErrorPage,
  tags: ['autodocs'],
  title: 'Components/Auth/ErrorPage/ErrorPage',
} satisfies Meta<typeof ErrorPage>

export default meta

type Story = StoryObj<typeof meta>

export const ErrorPageStory: Story = {
  render: () => {
    return <ErrorPage />
  },
}
