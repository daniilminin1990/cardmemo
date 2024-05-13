import { useState } from 'react'

import { Meta } from '@storybook/react'

import { TabSwitcher } from './TabSwitcher'

const meta = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/Tab Switcher',
} satisfies Meta<typeof TabSwitcher>

export default meta

const tabs = [
  { text: 'Select1', value: 'Select1' },
  { text: 'Select2', value: 'Select2' },
  { text: 'Select3', value: 'Select3' },
  { disabled: true, text: 'Select4', value: 'Select4' },
]

export const Default = {
  render: () => {
    const [value, setValue] = useState('myCards')
    const label = 'Show tabs'

    return (
      <div>
        <TabSwitcher
          label={label}
          onValueChange={value => setValue(value)}
          tabs={tabs}
          value={value}
        />
        <p style={{ marginTop: '36px' }}>{value}</p>
      </div>
    )
  },
}
