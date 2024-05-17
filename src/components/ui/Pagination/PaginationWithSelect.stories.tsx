import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import {
  PaginationWithSelect,
  selectOptionsType,
} from '@/components/ui/Pagination/PaginationWithSelect'

const meta = {
  argTypes: {},
  component: PaginationWithSelect,
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
    placeholder: 'Select',
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
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(10)

    return (
      <PaginationWithSelect
        {...args}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
    )
  },
}

export const TestPagin: Story = {
  args: {
    disabled: false,
    initPage: 1,
    lastPage: 10,
    maxLength: 7,
    placeholder: 'Select-box',
    selectOptions: [
      { text: 'Banana', value: 'Banana' },
      { text: 'Smetana', value: 'Smetana' },
      { text: 'Nirvana', value: 'Nirvana' },
      { text: 'Obezyana', value: 'Obezyana' },
    ] as selectOptionsType[],
  },
}
