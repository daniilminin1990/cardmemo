import z from 'zod'

export const addUpdateDeckSchema = z.object({
  cover: z.instanceof(File).optional(),
  isPrivate: z.boolean().optional(),
  name: z.string().min(3, { message: 'Name must be 3 or more word' }),
})

export type FormValues = z.infer<typeof addUpdateDeckSchema>
