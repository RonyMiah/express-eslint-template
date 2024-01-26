import { ZodError, ZodIssue } from 'zod'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'


const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorDetails: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: 'Zod ERROR',
    errorDetails,
  }
}

export default handleZodError
