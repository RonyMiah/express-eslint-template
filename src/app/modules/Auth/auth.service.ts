import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
const loginUser = async (payload: TLoginUser) => {
  //checking if the
  const isUserExists = await User.findOne({ email: payload.email })
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is Not Found ! ')
  }

  //Compair Password  if the password is currect
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  )
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password Do not match ')
  }

  //Send Access Token and Refresh Token

  return {}
}

export const AuthServices = {
  loginUser,
}
