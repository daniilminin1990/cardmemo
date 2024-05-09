import { ElementRef, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { StoryProps } from '@storybook/blocks'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

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

const WithRef: StoryFn<StoryProps> = (_: StoryProps) => {
  const cardRef = useRef<ElementRef<'div'> | null>(null)
  const [width, setWidth] = useState<null | number>(null)

  const showRef = () => {
    if (cardRef.current) {
      setWidth(cardRef.current?.getBoundingClientRect().width)
    }
  }

  return (
    <>
      <Card ref={cardRef}>
        <Button onClick={showRef} style={{ borderRadius: '5px', padding: '10px' }}>
          show ref width
        </Button>
        {width && <p>{width}</p>}
      </Card>
    </>
  )
}

export { WithRef }
