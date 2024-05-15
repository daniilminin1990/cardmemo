import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { StoryProps } from '@storybook/blocks'
import { Meta, StoryFn } from '@storybook/react'

import { Card } from './card'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta

export const Default: StoryFn<StoryProps> = (_: StoryProps) => {
  return <Card style={{ height: '100px' }}></Card>
}

export const WithContent: StoryFn<StoryProps> = (_: StoryProps) => {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '35px 24px' }}>
      <Typography as={'h2'} variant={'h2'}>
        Card
      </Typography>
      <Input label={'Uncontrolled text field'} type={'text'} />
      <Input label={'Uncontrolled search'} type={'search'} />
      <Input label={'Uncontrolled password'} type={'password'} />
    </Card>
  )
}
