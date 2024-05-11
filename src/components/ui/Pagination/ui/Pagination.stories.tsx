import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from '@/components/ui/Pagination/ui/Pagination'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const lastPage = 10
  const paginationLength = 7

  return (
    <Pagination
      currentPage={currentPage}
      lastPage={lastPage}
      paginationLength={paginationLength}
      setCurrentPage={setCurrentPage}
    />
  )
}
