import z from 'zod'

export const AddUpdateDeckSchema = z.object({
  cover: z.instanceof(File).optional(),
  isPrivate: z.boolean().optional(),
  name: z.string().min(3, { message: 'Name must be 3 or more word' }),
})

export type AddUpdateDeckFormValues = z.infer<typeof AddUpdateDeckSchema>
