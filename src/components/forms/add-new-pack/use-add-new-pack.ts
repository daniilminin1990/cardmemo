import { useForm } from 'react-hook-form'

import { fileSchema, stringSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const packSchema = z.object({
  coverPack: fileSchema,
  isPrivatePack: z.boolean(),
  packName: stringSchema,
})

export type AddNewPackFormType = z.infer<typeof packSchema>

export const useAddNewPackForm = (props: AddNewPackFormType) => {
  return useForm<AddNewPackFormType>({
    defaultValues: props,
    resolver: zodResolver(packSchema),
  })
}
