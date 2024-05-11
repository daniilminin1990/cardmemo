import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { PaginationTest } from '@/components/ui/PaginationTest/ui/PaginationTest'

const meta = {
  argTypes: {},
  component: PaginationTest,
  tags: ['autodocs'],
  title: 'Components/PaginationTest',
} satisfies Meta<typeof PaginationTest>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1)
  // const [pagesInARow, setPagesInARow] = useState(5)
  const pagesInARow = 5

  return (
    <div>
      <PaginationTest
        currentPage={currentPage}
        lastPage={100}
        pagesInARow={pagesInARow}
        setCurrentPage={setCurrentPage}
        // setPagesInARow={setPagesInARow}
      />
    </div>
  )
}
