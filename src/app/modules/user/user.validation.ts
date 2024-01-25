import { z } from 'zod'

const createUserValidation = z.object({
  name: z.string({ required_error: 'Name is Required' }),
  email: z.string({ required_error: 'Email is Required ' }).email(),
  password: z.string({ required_error: 'Password is Required !' }).max(20),
})

export const userValidation = {
  createUserValidation,
}
