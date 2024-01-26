import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Id is required ! ' }).email(),
  password: z.string({ required_error: 'Password is required !' }),
})
const changePasswordValidationSchema = z.object({
  oldPassword: z.string({ required_error: 'OldPassword is required ! ' }),
  newPassword: z.string({ required_error: 'Password is required !' }),
})
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is Requied !',
    }),
  }),
})

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
}
