import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { selectOptionsType } from '@/components/ui/Pagination/PaginationWithSelect'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Props = {
  customStyle?: string
  disabled?: boolean
  placeholder?: string
  selectOptions: selectOptionsType[]
}
const SelectUI = ({ customStyle, disabled, placeholder, selectOptions }: Props) => {
  const selectClasses = {
    content: clsx(s.selectContent),
    icon: clsx(s.selectIcon),
    root: s.selectRoot,
    trigger: clsx(
      s.selectTrigger,
      { [s.selectCustom]: customStyle },
      disabled && s.selectTriggerDisabled
    ),
    viewport: clsx(s.selectViewport),
  }

  return (
    <div className={selectClasses.root}>
      <Select.Root disabled={disabled}>
        <Select.Trigger aria-label={'select'} asChild className={selectClasses.trigger}>
          <button>
            <Select.Value placeholder={placeholder} />
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
