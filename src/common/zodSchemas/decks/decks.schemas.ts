import { z } from 'zod'

export const schemaAddEditDeck = z.object({
  isPrivate: z.boolean().optional(),
  name: z.string().min(3).max(30).trim(),
})

export type FormValuesAddEditDeck = z.infer<typeof schemaAddEditDeck>
