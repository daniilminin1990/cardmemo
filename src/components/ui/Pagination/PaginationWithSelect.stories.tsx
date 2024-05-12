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
    placeholder: 'Select',
    selectOptions: [
      { text: '10', value: '10' },
      { text: '20', value: '20' },
      { text: '30', value: '30' },
      { text: '50', value: '50' },
      { text: '100', value: '100' },
    ] as selectOptionsType[],
  },
}
