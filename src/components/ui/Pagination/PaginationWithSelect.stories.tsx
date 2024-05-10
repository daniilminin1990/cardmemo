import type { Meta, StoryObj } from '@storybook/react'

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
    disabled: false,
    initPage: 1,
    lastPage: 10,
    maxLength: 7,
    placeholder: 'Select-box',
    selectOptions: [
      { text: '10', value: '10' },
      { text: '20', value: '20' },
      { text: '30', value: '30' },
      { text: '50', value: '50' },
      { text: '100', value: '100' },
    ] as selectOptionsType[],
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
