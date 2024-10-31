import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'

import {
  PaginationWithSelect,
  selectOptionsType,
} from '@/components/ui/Pagination/PaginationWithSelect'

const meta = {
  argTypes: {},
  component: PaginationWithSelect,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/PaginationWithSelect',
} satisfies Meta<typeof PaginationWithSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 1,
    disabled: false,
    itemsPerPage: 10,
    selectOptions: [
      { text: '10', value: '10' },
      { text: '20', value: '20' },
      { text: '30', value: '30' },
      { text: '50', value: '50' },
      { text: '100', value: '100' },
    ] as selectOptionsType[],
    setCurrentPage: () => {},
    setItemsPerPage: () => {},
    totalItems: 300,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState<number>(args.currentPage)
    const [itemsPerPage, setItemsPerPage] = useState<number>(args.itemsPerPage)

    return (
      <PaginationWithSelect
        {...args}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={(value: number) => {
          setItemsPerPage(value)
        }}
      />
    )
  },
}
