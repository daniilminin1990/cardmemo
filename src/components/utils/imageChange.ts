import { ChangeEvent } from 'react'

type Props = {
  e: ChangeEvent<HTMLInputElement>
  fieldName: string
  setImagePreview: (file: string) => void
  setValue: (fieldName: any, value: File) => void
}
export const imageChangeHandler = ({ e, fieldName, setImagePreview, setValue }: Props) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files?.[0]

    setValue(fieldName, file)
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
}
