import { ComponentPropsWithoutRef, useId } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { Label } from '@radix-ui/react-label'

import './checkbox.scss'

export type Props = {} & ComponentPropsWithoutRef<typeof Checkbox.Root>

const StyledCheckbox = (props: Props) => {
  const { id, isChecked, isDisabled, label, onCheckedChange } = props
  const disabledClass = isDisabled ? 'disabled' : ''
  const generatedId = useId()

  return (
    <div className={`checkboxContainer ${disabledClass}`}>
      <Checkbox.Root
        checked={isChecked}
        className={`CheckboxRoot ${disabledClass}`}
        disabled={isDisabled}
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
}

export default StyledCheckbox
