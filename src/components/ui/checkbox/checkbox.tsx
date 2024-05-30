import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import CheckIcon from '@/assets/icons/svg/CheckboxIcon'
import Typography from '@/components/ui/Typography/Typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxPropsProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxPropsProps>(
  (props: CheckboxPropsProps, ref) => {
    const { checked, className, disabled, id, label, onCheckedChange, ...rest } = props
    const generatedId = useId()
    const classNames = {
      CheckboxContainer: clsx(s.CheckboxContainer),
      CheckboxIndicator: clsx(s.CheckboxIndicator, disabled && s.disabled, checked && s.checked),
      CheckboxRoot: clsx(s.CheckboxRoot, disabled && s.disabled, checked && s.checked, className),
      Label: clsx(s.Label, disabled && s.disabled, className),
    }

    return (
      <div className={classNames.CheckboxContainer}>
        <CheckboxRadix.Root
          {...rest}
          checked={checked}
          className={s.CheckboxRoot}
          defaultChecked
          id={id ?? generatedId}
          onCheckedChange={onCheckedChange}
          ref={ref}
        >
          {checked && (
            <CheckboxRadix.Indicator asChild className={classNames.CheckboxIndicator}>
              {<CheckIcon />}
            </CheckboxRadix.Indicator>
          )}
        </CheckboxRadix.Root>
        <label className={s.Label} htmlFor={id ?? generatedId}>
          <Typography as={'label'} variant={'body2'}>
            {label}
          </Typography>
        </label>
      </div>
    )
  }
)

export default Checkbox
