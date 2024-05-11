import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { PaginationWithSelectTest } from '@/components/ui/PaginationTest/PaginationWithSelectTest'

const meta = {
  argTypes: {},
  component: PaginationWithSelectTest,
  tags: ['autodocs'],
  title: 'Components/PaginationWithSelectTest',
} satisfies Meta<typeof PaginationWithSelectTest>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pagesInARow = 5

  return (
    <div>
      <PaginationWithSelectTest
        currentPage={currentPage}
        lastPage={100}
        pagesInARow={pagesInARow}
        selectOptions={[
          { text: '10', value: '10' },
          { text: '20', value: '20' },
          { text: '30', value: '30' },
          { text: '50', value: '50' },
          { text: '100', value: '100' },
        ]}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
