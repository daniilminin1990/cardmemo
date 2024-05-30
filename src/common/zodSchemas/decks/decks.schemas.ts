import { z } from 'zod'

export const schemaAddEditDeck = z.object({
  isPrivate: z.boolean().optional(),
  name: z.string().min(3).max(30),
})

export type FormValuesAddEditDeck = z.infer<typeof schemaAddEditDeck>
