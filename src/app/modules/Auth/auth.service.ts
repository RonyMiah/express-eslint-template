import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'

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

  const jwtPayload = {
    name: isUserExists.name,
    email: isUserExists.email,
    _id: isUserExists._id,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_access_expiration_minutes,
  })
  const refreshToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_refresh_expiration_days,
  })

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  }
}

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //checking if the
  const isUserExists = await User.findOne({ email: user.email })
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is Not Found ! ')
  }

  //Compair Password  if the password is currect
  const isPasswordMatch = await bcrypt.compare(
    payload?.oldPassword,
    isUserExists?.password,
  )
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password Do not match ')
  }

  //hashed New Password ..

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_solt_round),
  )

  await User.findOneAndUpdate(
    {
      _id: user._id,
      email: user.email,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  )

  return null
}

const refreshToken = async (token: string) => {
  
    let decoded

    try {
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'UnAuthorized.. !')
    }
    // console.log(decoded)
    const { email } = decoded

    //Check if the user is exists
    const isUserExists = await User.findOne({ email: email })
    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is Not Found ! ')
    }
  //create Token 

  const jwtPayload = {
    name: isUserExists.name,
    email: isUserExists.email,
    _id: isUserExists._id,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_access_expiration_minutes,
  })

  return { 
    accessToken
  }
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
}
