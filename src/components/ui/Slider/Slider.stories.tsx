import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Slider, SliderProps } from './Slider'

const meta: Meta<typeof Slider> = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
}

export default meta
type Story = StoryObj<typeof meta>

const SliderWithHooks = (args: SliderProps) => {
  const [value, setValue] = useState(args.value)

  const onValueChangeHandler = (value: number[]) => {
    setValue(value)
  }

  return <Slider {...args} onValueChange={onValueChangeHandler} value={value} />
}

export const Default: Story = {
  args: {
    max: 10,
    min: 0,
    step: 1,
    value: [0, 10],
  },
  render: args => <SliderWithHooks {...args} />,
}
