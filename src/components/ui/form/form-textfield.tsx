import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import Input, { InputProps } from '@/components/ui/Input/Input'

export type ControlledInputProps<TFieldValues extends FieldValues> = {
  className: string
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<InputProps, 'onChange' | 'value'>

export const FormTextfield = <TFieldValues extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    shouldUnregister: true,
  })

  return <Input {...rest} {...field} error={error?.message} />
}
