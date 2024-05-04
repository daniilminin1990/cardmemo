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
    namesArr: ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'],
  },
}
