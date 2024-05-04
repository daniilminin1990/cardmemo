import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import Checkbox from './checkbox'

const meta: Meta = {
  argTypes: {
    onCheckedChange: { action: 'checked' },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'COMPONENTS/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    id: 'checked-checkbox',
    isChecked: true,
    isDisabled: false,
    label: 'Click me',
  },
}

export const Unchecked: Story = {
  args: {
    id: 'unchecked-checkbox',
    isChecked: false,
    isDisabled: false,
    label: 'Click me',
  },
}

export const DisabledChecked: Story = {
  args: {
    id: 'disabled-unchecked-checkbox',
    isChecked: true,
    isDisabled: true,
    label: 'Click me',
  },
}

export const DisabledUnchecked: Story = {
  args: {
    id: 'disabled-checked-checkbox',
    isChecked: false,
    isDisabled: true,
    label: 'Click me',
  },
}

export const Controlled: Story = {
  args: {
    label: 'Click me',
  },
  render: args => {
    const [checked, setChecked] = useState(true)

    return (
      <Checkbox
        {...args}
        id={'controlled-checkbox'}
        isChecked={checked}
        onCheckedChange={() => setChecked(!checked)}
      />
    )
  },
}
