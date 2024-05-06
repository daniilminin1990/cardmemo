import { SubmitHandler, useController, useForm } from 'react-hook-form'

import Input from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/button'

type FormValue = {
  login: string
  password: string
  rememberMe: boolean
}

export default function LoginForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValue>()
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    name: 'rememberMe',
  })
  const onSubmit: SubmitHandler<FormValue> = data => console.log(data)

  // 123
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register('login', { required: true })}
          disabled={false}
          error={errors.login}
          label={'Login'}
          placeholder={'Login'}
          type={'text'}
        />
      </div>
      <div>
        <Input
          {...register('password', { required: true })}
          disabled={false}
          error={errors.password}
          label={'Password'}
          placeholder={'Password'}
          type={'password'}
        />
      </div>
      <Button type={'submit'}> Submit </Button>
    </form>
  )
}
