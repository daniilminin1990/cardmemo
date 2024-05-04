import type { Meta, StoryObj } from '@storybook/react'

import SelectUI from '@/components/ui/Select/Select'

const meta = {
  component: SelectUI,
  tags: ['autodocs'],
  title: 'Components/SelectUI',
} satisfies Meta<typeof SelectUI>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Select-box',
    selectOptions: [
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Select-box',
    selectOptions: [
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
    ],
  },
}
