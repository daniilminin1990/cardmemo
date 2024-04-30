import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './card'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <></>,
  },
}

export const WithContent: Story = {
  args: {
    children: (
      <>
        <p>Hello world!</p>
      </>
    ),
  },
}
