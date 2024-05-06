import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import Input, { inputProps } from '@/components/ui/Input/Input'

export type ControlledInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<inputProps, 'id' | 'onChange' | 'value'>

export const FormTextfield = <TFieldValues extends FieldValues>(
  props: ControlledInputProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return <Input {...props} {...field} error={error?.message} id={props.name} />
}
