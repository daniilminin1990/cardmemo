import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { selectOptionsType } from '@/components/ui/Pagination/PaginationWithSelect'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Props = {
  disabled?: boolean
  placeholder?: string
  selectOptions: selectOptionsType[]
}
const SelectUI = ({ disabled, placeholder, selectOptions }: Props) => {
  const selectClasses = {
    content: clsx(s.selectContent),
    icon: clsx(s.selectIcon),
    trigger: clsx(s.selectTrigger, disabled && s.selectTriggerDisabled),
    viewport: clsx(s.selectViewport),
  }

  return (
    <div className={s.selectRoot}>
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
