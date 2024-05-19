import PageDeckNextQuestion from '@/components/auth/PageDeckNextQuestion/PageDeckNextQuestion'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: PageDeckNextQuestion,
  tags: ['autodocs'],
  title: 'Components/Auth/PageDeckNextQuestion/PageDeckNextQuestion',
} satisfies Meta<typeof PageDeckNextQuestion>

export default meta

type Story = StoryObj<typeof meta>

export const PageDeckNextQuestionStory: Story = {
  args: {
    status: true,
  },
}
