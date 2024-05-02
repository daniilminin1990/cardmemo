import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

const SelectDemo = () => {
  const placeholder = 'Select-box'
  const selectOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]

  return (
    <Select.Root>
      <Select.Trigger aria-label={'select'} asChild className={clsx(s.selectTrigger)}>
        <button>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={clsx(s.selectIcon)}>
            <ChevronDownIcon />
          </Select.Icon>
        </button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={clsx(s.selectContent)}>
          <Select.Viewport className={clsx(s.selectViewport)}>
            {selectOptions.map(option => {
              return (
                <Select.Item key={option.value} value={option.value}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default SelectDemo
