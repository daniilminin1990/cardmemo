import { useForm } from 'react-hook-form'

import { fileSchema, stringSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const packSchema = z.object({
  answerName: stringSchema,
  coverAnswer: fileSchema,
  coverQuestion: fileSchema,
  questionName: stringSchema,
})

export type AddNewCardFormType = z.infer<typeof packSchema>

export const useAddNewCardForm = (props: AddNewCardFormType) => {
  return useForm<AddNewCardFormType>({
    defaultValues: props,
    resolver: zodResolver(packSchema),
  })
}
