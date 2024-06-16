import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { gradeNames } from '@/common/globalVariables'
import { LearnCardFormValues } from '@/common/zodSchemas/cards/cards.schemas'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Radio } from '@/components/ui/radio'

import s from './GradeForm.module.scss'

type Props = {
  onSubmit: SubmitHandler<FieldValues>
}

export const GradeForm = ({ onSubmit }: Props) => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<LearnCardFormValues>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={'grade'}
        render={({ field }) => (
          <Radio.Root
            className={s.radio}
            name={field.name}
            onValueChange={value => field.onChange(value)}
            value={`${field.value}`}
          >
            {gradeNames.map(grade => (
              <Radio.Item key={grade.name} value={`${grade.grade}`}>
                <Typography variant={'body2'}>{t(`${grade.name}`)}</Typography>
              </Radio.Item>
            ))}
          </Radio.Root>
        )}
      />
      <Button as={'button'} fullWidth type={'submit'}>
        <Typography as={'span'}>{t('learnPage.nextQuestion')}</Typography>
      </Button>
    </form>
  )
}
