import { ChangeEvent } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { ButtonProps } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/file-uploader/file-uploader'

export type ControlledFileUploaderProps<T extends FieldValues> = {
  control: Control<T>
  extraActions?: () => void
  name: FieldPath<T>
} & Omit<ButtonProps, 'onChange' | 'onClick' | 'type'>

export const FormFileUploader = <T extends FieldValues>({
  control,
  extraActions,
  name,
  ...rest
}: ControlledFileUploaderProps<T>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    onChange(file)
    extraActions?.()
    e.target.value = ''
  }

  return <FileUploader name={name} onChange={changeHandler} type={'button'} {...rest} />
}
