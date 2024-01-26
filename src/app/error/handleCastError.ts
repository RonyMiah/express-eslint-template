import mongoose from 'mongoose'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 404
  const errorDetails: TErrorSources = [
    {
      path: error?.path,
      message: error?.message,
    },
  ]
  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: `${error.value} is not a valid ID!`,
    errorDetails,
  }
}

export default handleCastError