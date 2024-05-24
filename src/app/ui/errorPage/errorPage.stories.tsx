import type { Meta, StoryObj } from '@storybook/react'

import ErrorPage from '@/app/ui/errorPage/errorPage'

const meta = {
  component: ErrorPage,
  tags: ['autodocs'],
  title: 'Components/Auth/errorPage/errorPage',
} satisfies Meta<typeof ErrorPage>

export default meta

type Story = StoryObj<typeof meta>

export const ErrorPageStory: Story = {
  render: () => {
    return <ErrorPage />
  },
}
