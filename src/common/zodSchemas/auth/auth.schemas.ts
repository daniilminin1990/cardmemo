import { z } from 'zod'

export const PersonalInfoScheme = z.object({
  avatar: z.unknown().optional().nullable(),
  nickName: z.string().min(1, 'Type new nickname'),
})

export type PersonalInfoFormValue = z.infer<typeof PersonalInfoScheme>
