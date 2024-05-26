import { useController } from 'react-hook-form'
import Checkbox from "@/components/ui/checkbox/checkbox";


type Props = {control: any}

const FormCheckbox = (props: Props) => {
  const {control} = props
  const { field: { onChange, value, ...field} } = useController({ control, name: 'rememberMe' }) }

  return (

      <Checkbox {...field} checked={value} label={'rememberMe'} onCheckedChange={onChange} />

  )
}

export default FormCheckbox
