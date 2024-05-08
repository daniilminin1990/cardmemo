import { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { Label } from '@radix-ui/react-label'

import './checkbox.scss'

export type Props = { className?: string; label?: string } & ComponentPropsWithoutRef<
  typeof Checkbox.Root
>

const StyledCheckbox = forwardRef<HTMLButtonElement, Props>((props: Props) => {
  const { checked, disabled, id, label, onCheckedChange } = props
  const disabledClass = disabled ? 'disabled' : ''
  const generatedId = useId()

  return (
    <div className={`checkboxContainer ${disabledClass} ${props.className}`}>
      <Checkbox.Root
        checked={checked}
        className={`CheckboxRoot ${disabledClass}`}
        disabled={disabled}
        id={id ?? generatedId}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator
          className={`checkboxFrame ${disabledClass}`}
          forceMount
        ></Checkbox.Indicator>
        <Label className={`label ${disabledClass}`} htmlFor={id ?? generatedId}>
          {label}
        </Label>
      </Checkbox.Root>
    </div>
  )
})

export default StyledCheckbox
