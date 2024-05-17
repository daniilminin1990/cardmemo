import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import CheckIcon from '@/assets/icons/svg/CheckboxIcon'
import Typography from '@/components/ui/Typography/Typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import './checkbox.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, Props>((props: Props) => {
  const { checked, className, disabled, id, label, onCheckedChange, ...rest } = props
  const disabledClass = disabled ? 'disabled' : ''
  const checkedClass = checked ? 'checked' : ''
  const generatedId = useId()

  return (
    <Typography as={'label'} className={'Label'} variant={'body2'}>
      <form>
        <div className={'CheckboxContainer'}>
          <CheckboxRadix.Root
            {...rest}
            checked={checked}
            className={`CheckboxRoot ${disabledClass} ${checkedClass}`}
            defaultChecked
            id={id ?? generatedId}
            onCheckedChange={onCheckedChange}
          >
            {checked && (
              <CheckboxRadix.Indicator
                asChild
                className={`CheckboxIndicator ${disabledClass} ${checkedClass}`}
              >
                {<CheckIcon />}
              </CheckboxRadix.Indicator>
            )}
          </CheckboxRadix.Root>
          <label className={`Label ${disabledClass}`} htmlFor={id ?? generatedId}>
            {label}
          </label>
        </div>
      </form>
    </Typography>
  )
})

export default Checkbox
