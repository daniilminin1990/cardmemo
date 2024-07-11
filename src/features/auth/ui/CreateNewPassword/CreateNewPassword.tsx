import { SuccessModal } from '@/components/Modals/ModalSuccess/SuccessModal'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { LoadingBar } from '@/components/ui/loadingBar/LoadingBar'
import { UseCreateNewPassword } from '@/features/auth/lib/hook/useCreateNewPassword'

import s from './createNewPassword.module.scss'

export const CreateNewPassword = () => {
  const { control, handleSubmit, isLoading, onSubmit, open, setOpen } = UseCreateNewPassword()

  return (
    <>
      <SuccessModal open={open} setOpen={setOpen} />
      {isLoading && <LoadingBar />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={s.card}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Create New Password
            </Typography>
          </div>
          <div className={s.box}>
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'New Password'}
              name={'newPassword'}
              type={'password'}
            />
            <FormTextfield
              className={s.inputStyle}
              control={control}
              label={'Confirm New Password'}
              name={'confirmNewPassword'}
              type={'password'}
            />
          </div>

          <Button fullWidth>Confirm</Button>
        </Card>
      </form>
    </>
  )
}
