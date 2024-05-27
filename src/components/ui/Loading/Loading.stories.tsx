import type { Meta, StoryObj } from '@storybook/react'

import Loading from '@/components/ui/Loading/Loading'

const meta = {
  component: Loading,
  title: 'Components/Loading',
} satisfies Meta<typeof Loading>

export default meta

type Story = StoryObj<typeof Loading>

export const DropDownHeader: Story = {
  args: {
    isShow: true,
  },
}
