import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../error/AppError'
import httpStatus from 'http-status'

import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/user/user.model'

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized !')
    }

    //*Check if the Giventoken is Valid Token ?

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

    // let isBeforePasswordChange
    // if (isUserExists.passwordChangeAt) {
    //   const passwordChangeTimeToMiliSecound =
    //     new Date(isUserExists.passwordChangeAt).getTime() / 1000
    //   isBeforePasswordChange = passwordChangeTimeToMiliSecound > (iat as number)
    // }

    // if (isBeforePasswordChange) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized!.... ')
    // }

    // console.log(isBeforePasswordChange)

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
