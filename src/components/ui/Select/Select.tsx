import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { selectOptionsType } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Props = {
  className?: string
  disabled?: boolean
  onValueChange?: (items: string) => void
  selectOptions: selectOptionsType[]
  value?: string
}
const SelectUI = ({ className, disabled, onValueChange, selectOptions, value }: Props) => {
  const selectClasses = {
    button: clsx(className && s.button, s.className),
    content: clsx(s.selectContent),
    icon: clsx(s.selectIcon, className && s.className),
    root: s.selectRoot,
    selectItem: clsx(s.selectItem, className && s.className),
    trigger: clsx(
      s.selectTrigger,
      { [s.className]: className },
      disabled && s.selectTriggerDisabled
    ),
    viewport: clsx(s.selectViewport),
  }

  return (
    <div className={selectClasses.root}>
      <Select.Root disabled={disabled} onValueChange={onValueChange}>
        <Select.Trigger aria-label={'select'} asChild className={selectClasses.trigger}>
          <button>
            <Typography className={s.selectVariant} variant={'body2'}>
              {selectOptions.find(el => el.value === value)?.text || selectOptions[0].text}
            </Typography>
            <ArrowIosDownOutline className={selectClasses.icon} />
          </button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={selectClasses.content} position={'popper'}>
            <Select.Viewport className={selectClasses.viewport}>
              {selectOptions.map(option => {
                return (
                  <Select.Item
                    className={selectClasses.selectItem}
                    key={option.value}
                    value={option.value}
                  >
                    <Select.ItemText className={s.selectText}>
                      <Typography variant={'body2'}>{option.text}</Typography>
                    </Select.ItemText>
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
