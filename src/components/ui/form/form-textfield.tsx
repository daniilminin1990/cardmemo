import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import Input, { InputProps } from '@/components/ui/Input/Input'

export type ControlledInputProps<TFieldValues extends FieldValues> = {
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

  console.log(rest.itemRef)

  // return <Input {...rest} {...field} error={error?.message} />
  return (
    <Input
      {...rest}
      {...field}
      // error={errors.password?.message}
      error={error?.message}
      // label={rest.label}
      // placeholder={rest.label}
      // type={rest.type}
    />
  )
  // <Input {...rest} {...field} error={error?.message} />
}
