import { z } from 'zod'

export const PersonalInfoScheme = z.object({
  avatar: z.unknown().optional().nullable(),
  nickName: z.string().min(1, 'Type new nickname'),
})

export type PersonalInfoFormValue = z.infer<typeof PersonalInfoScheme>

export const ResetPasswordSchema = z
  .object({
    confirmNewPassword: z.string().min(3),
    newPassword: z.string().min(3),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>

export const SignUpSchema = z
  .object({
    confirmPassword: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }

    return data
  })

export type SignUpFormValues = z.infer<typeof SignUpSchema>
