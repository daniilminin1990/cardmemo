import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupRadix } from './radioGroup'

const meta = {
  component: RadioGroupRadix,
  tags: ['autodocs'],
  title: 'Components/Radio',
} satisfies Meta<typeof RadioGroupRadix>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [
      {
        disabled: false,
        id: '1',
        value: 'aaa',
      },
      {
        disabled: false,
        id: '2',
        value: 'qqq',
      },
      {
        disabled: false,
        id: '3',
        value: 'www',
      },
      {
        disabled: false,
        id: '4',
        value: 'eee',
      },
    ],
  },
}

export const Disabled: Story = {
  args: {
    items: [
      {
        disabled: true,
        id: '1',
        value: 'aaa',
      },
    ],
  },
}
