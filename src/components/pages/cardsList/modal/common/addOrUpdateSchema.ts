import z from 'zod'

export const addOrUpdateCardSchema = z.object({
  answer: z.string().min(3, { message: 'Answer is required' }),
  answerImg: z.unknown().optional(),
  answerVideo: z.string().optional(),
  question: z.string().min(3, { message: 'Question must be 3 or more word' }),
  questionImg: z.unknown().optional(),
  questionVideo: z.string().optional(),
})
export type FormValues = z.infer<typeof addOrUpdateCardSchema>
