import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Edit2 from '@/assets/icons/svg/Edit2'
import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import LogOut from '@/assets/icons/svg/LogOut'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './personalInfo.module.scss'

import ellipseIcon from '../../../assets/icons/WhiteSVG/Ellipse 1.svg'

const createNewPassScheme = z.object({
  nickname: z.string().min(1, 'Type new nickname'),
})

type FormValue = z.infer<typeof createNewPassScheme>

type Props = {
  email: string
  isEditNickname?: boolean
  setIsEditNickname: (value: boolean) => void
  title: string
}
export const PersonalInfo = ({ email, isEditNickname, setIsEditNickname, title }: Props) => {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      nickname: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(createNewPassScheme),
  })

  const onSubmit: SubmitHandler<FormValue> = data => console.log(data)

  // const [isEdit, setIsEdit] = useState<boolean>(true)

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}
      <Card className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.header}>
            <Typography as={'h1'} className={s.typographyHead} variant={'h1'}>
              Personal Information
            </Typography>
          </div>
          <div className={s.box}>
            <div className={s.imgGroup}>
              <img alt={''} className={s.img} src={ellipseIcon} />
              {isEditNickname && (
                <Button
                  className={clsx(s.editIconButton, s.editIconButtonImg)}
                  variant={'secondary'}
                >
                  <Edit2Outline className={s.editIcon} />
                </Button>
              )}
            </div>
            {isEditNickname ? (
              <div className={s.profileEdit}>
                <Typography variant={'h1'}>
                  {title}{' '}
                  <Button
                    className={clsx(s.editIconButton, s.editIconButtonTxt)}
                    onClick={() => setIsEditNickname(!isEditNickname)}
                  >
                    <Edit2Outline className={s.editIcon} />
                  </Button>
                </Typography>
                <Typography className={s.email} variant={'body2'}>
                  {email}
                </Typography>
              </div>
            ) : (
              <FormTextfield
                className={s.inputStyle}
                control={control}
                label={'Nickname'}
                name={'nickname'}
                placeholder={'Type new nickname'}
                type={'text'}
              />
            )}
          </div>
          <div className={clsx(s.buttonWrapper, isEditNickname && s.buttonWrapperEdit)}>
            {/*<Button fullWidth={!isEditNickname} variant={isEditNickname ? 'secondary' : 'primary'}>*/}
            {isEditNickname ? (
              <Button fullWidth={false} variant={'secondary'}>
                <Typography variant={'body2'}>
                  <LogOut className={s.logoutIcon} />
                  Logout
                </Typography>
              </Button>
            ) : (
              <Button fullWidth onClick={() => setIsEditNickname(true)} variant={'primary'}>
                <Typography variant={'body2'}>Save changes</Typography>
              </Button>
            )}
            {/*</Button>*/}
          </div>
        </form>
      </Card>
    </>
  )
}
