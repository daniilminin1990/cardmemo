import { useState } from 'react'

import { Meta } from '@storybook/react'

import { TabSwitcher } from './TabSwitcher'

const meta = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/Tab Switcher',
} satisfies Meta<typeof TabSwitcher>

export default meta

const tabsDefault = [
  { locale: 'Select1', text: 'Select1', value: 'Select1' },
  { locale: 'Select2', text: 'Select2', value: 'Select2' },
  { locale: 'Select3', text: 'Select3', value: 'Select3' },
  { locale: 'Select4', text: 'Select4', value: 'Select4' },
]

const tabsDisabled = [
  { disabled: true, locale: 'Select1', text: 'Select1', value: 'Select1' },
  { disabled: true, locale: 'Select2', text: 'Select2', value: 'Select2' },
  { disabled: true, locale: 'Select3', text: 'Select3', value: 'Select3' },
  { disabled: true, locale: 'Select4', text: 'Select4', value: 'Select4' },
]

export const Default = {
  render: () => {
    const [value, setValue] = useState('myCards')
    const label = 'Show tabs'

    return (
      <div
        style={{
          width: '230px',
        }}
      >
        <TabSwitcher
          label={label}
          onValueChange={value => setValue(value)}
          tabs={tabsDefault}
          value={value}
        />
        <p style={{ marginTop: '36px' }}>{value}</p>
      </div>
    )
  },
}

export const Disabled = {
  render: () => {
    const [value, setValue] = useState('myCards')
    const label = 'Show tabs'

    return (
      <div
        style={{
          width: '230px',
        }}
      >
        <TabSwitcher
          label={label}
          onValueChange={value => setValue(value)}
          tabs={tabsDisabled}
          value={value}
        />
        <p style={{ marginTop: '36px' }}>{value}</p>
      </div>
    )
  },
}
