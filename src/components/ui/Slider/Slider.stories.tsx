import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import Slider from './Slider'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Number of cards',
    max: 10,
    min: 0,
    value: [2, 10],
  },
  render: args => {
    const [sliderValue, setSliderValue] = useState(args.value)

    const onChangeSliderValue = (value: number[]) => {
      setSliderValue(value)
    }

    return <Slider {...args} onValueChange={onChangeSliderValue} value={sliderValue} />
  },
}
