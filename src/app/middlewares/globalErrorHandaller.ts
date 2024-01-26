/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { TErrorSources } from '../interface/error'
import handleZodError from '../error/handleZodError'
import handleValidationError from '../error/handleValidationError'
import handleDuplicateError from '../error/handleDuplicateError'
import handleCastError from '../error/handleCastError'
import AppError from '../error/AppError'
import config from '../config'

const getErrorMessage = (errorDetails: TErrorSources): string => {
  let msg = ''
  errorDetails.forEach((f) => {
    msg += `${f.path} is ${f.message}. `
  })
  return msg
}

const globalErrorHandaller: ErrorRequestHandler = (error, req, res, next) => {
  //defult values
  let statusCode = 500
  let message = 'Something went to wrong !'
  let errorMessage = ''
  let errorDetails: TErrorSources | Record<string, unknown> = [
    {
      path: '',
      message: 'something went to be wrong',
    },
  ]
  //check error Zod Validation
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = getErrorMessage(simplifiedError.errorDetails)
    errorDetails = {
      issues: error.issues,
      name: error?.name,
    }
  }
  //Handle Mongoose Error such as unic true
  else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = getErrorMessage(simplifiedError.errorDetails)
    errorDetails = simplifiedError.errorDetails
  }

  //CastError
  else if (error?.name == 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
    errorDetails = simplifiedError.errorDetails
  }

  //duplicate error 11000
  else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = getErrorMessage(simplifiedError.errorDetails)
    errorDetails = simplifiedError.errorDetails
  }
  //App Error
  else if (error instanceof AppError) {
    statusCode = error?.statusCode
    message = error?.message
    errorDetails = [
      {
        path: '',
        message: error?.message,
      },
    ]
  }
  //error
  else if (error instanceof Error) {
    message = error?.message
    errorDetails = [
      {
        path: '',
        message: error?.message,
      },
    ]
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    // error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  })
}

export default globalErrorHandaller
