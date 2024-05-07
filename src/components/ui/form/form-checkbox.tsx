import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import Checkbox, { Props } from '@/components/ui/checkbox/checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = Omit<
  Props,
  'isChecked' | 'onCheckedChange'
> &
  Pick<UseControllerProps<T>, 'control' | 'name'>

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    shouldUnregister: true,
  })

  return <Checkbox {...rest} isChecked={value} onCheckedChange={onChange} />
}
