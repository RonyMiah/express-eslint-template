export interface TUser {
  name: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangeAt?: Date
}
