import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/components/ui/Pagination/ui/Pagination'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initPage: 1,
    lastPage: 10,
    maxLength: 7,
  },
}
