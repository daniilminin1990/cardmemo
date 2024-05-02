import * as Checkbox from '@radix-ui/react-checkbox'
import { Label } from '@radix-ui/react-label'

import './checkbox.scss'

type Props = {
  id: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  onCheckedChange: (checked: boolean) => void
}

const StyledCheckbox = (props: Props) => {
  const { id, isChecked, isDisabled, label, onCheckedChange } = props
  const disabledClass = isDisabled ? 'disabled' : ''
  const labelId = id // Уникальный ID для связи с Label

  return (
    <div className={`checkboxContainer ${disabledClass}`}>
      <Checkbox.Root
        checked={isChecked}
        className={`CheckboxRoot ${disabledClass}`}
        disabled={isDisabled}
        id={labelId}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator
          className={`checkboxFrame ${disabledClass}`}
          forceMount
        ></Checkbox.Indicator>
        <Label
          className={`label ${disabledClass}`}
          htmlFor={labelId} // Связывание с Checkbox через ID
        >
          {label}
        </Label>
      </Checkbox.Root>
    </div>
  )
}

export default StyledCheckbox
