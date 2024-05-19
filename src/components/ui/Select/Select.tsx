import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { selectOptionsType } from '@/components/ui/Pagination/PaginationWithSelect'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Props = {
  className?: string
  disabled?: boolean
  onValueChange?: (items: string) => void
  selectOptions: selectOptionsType[]
  value?: string // РАНЬШЕ БЫЛ  placeholder
}
const SelectUI = ({ className, disabled, onValueChange, selectOptions, value }: Props) => {
  // const placeholderText = placeholder || selectOptions[0].text
  const selectClasses = {
    content: clsx(s.selectContent),
    icon: clsx(s.selectIcon),
    root: s.selectRoot,
    trigger: clsx(
      s.selectTrigger,
      { [s.selectCustom]: className },
      disabled && s.selectTriggerDisabled
    ),
    viewport: clsx(s.selectViewport),
  }

  return (
    <div className={selectClasses.root}>
      <Select.Root disabled={disabled} onValueChange={onValueChange}>
        <Select.Trigger aria-label={'select'} asChild className={selectClasses.trigger}>
          <button>
            {/*<Select.Value aria-label={value}>*/}
            {/*Изменил эту строку ниже -- теперь тут определяет по selectOptions*/}
            {selectOptions.find(el => el.value === value)?.text || selectOptions[0].text}
            {/*</Select.Value>*/}
            <ArrowIosDownOutline className={selectClasses.icon} />
          </button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={selectClasses.content} position={'popper'}>
            <Select.Viewport className={selectClasses.viewport}>
              {selectOptions.map(option => {
                return (
                  <Select.Item className={s.selectItem} key={option.value} value={option.value}>
                    <Select.ItemText className={s.selectText}>{option.text}</Select.ItemText>
                  </Select.Item>
                )
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export default SelectUI
