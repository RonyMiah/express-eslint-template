import mongoose from 'mongoose'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'


const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorDetails: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: `{VALUE} is required`,
    errorDetails,
  }
}

export default handleValidationError