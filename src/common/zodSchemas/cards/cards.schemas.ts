import z from 'zod'

export const AddUpdateCardSchema = z.object({
  answer: z.string().min(3, { message: 'Answer is required' }),
  answerImg: z.unknown().optional(),
  answerVideo: z.string().optional(),
  question: z.string().min(3, { message: 'Question must be 3 or more word' }),
  questionImg: z.unknown().optional(),
  questionVideo: z.string().optional(),
})

export type AddUpdateCardFormValues = z.infer<typeof AddUpdateCardSchema>

export const LearnCardSchema = z.object({
  grade: z.number().min(1).max(5).nullable(),
})

export type LearnCardFormValues = z.infer<typeof LearnCardSchema>
