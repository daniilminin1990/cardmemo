import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import CheckIcon from '@/assets/icons/svg/CheckboxIcon'
import * as Checkbox from '@radix-ui/react-checkbox'

import './checkbox.scss'

type Props = {
  className?: string
  label?: string
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

const CheckboxDemo = forwardRef<ElementRef<typeof Checkbox.Root>, Props>((props: Props) => {
  const { checked, disabled, id, label, onCheckedChange, ...rest } = props
  const disabledClass = disabled ? 'disabled' : ''
  const checkedClass = checked ? 'checked' : ''
  const generatedId = useId()

  return (
    <form>
      <div className={'CheckboxContainer'}>
        <Checkbox.Root
          {...rest}
          checked={checked}
          className={`CheckboxRoot ${disabledClass} ${checkedClass}`}
          defaultChecked
          id={id ?? generatedId}
          onCheckedChange={onCheckedChange}
        >
          {checked && (
            <Checkbox.Indicator
              asChild
              className={`CheckboxIndicator ${disabledClass} ${checkedClass}`}
            >
              {<CheckIcon />}
            </Checkbox.Indicator>
          )}
        </Checkbox.Root>
        <label className={`Label ${disabledClass}`} htmlFor={id ?? generatedId}>
          {label}
        </label>
      </div>
    </form>
  )
})

export default CheckboxDemo
