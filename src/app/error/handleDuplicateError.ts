/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from '../interface/error'


const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"(.*?)"/)
  const extedMessage = match && match[1]

  const errorDetails: TErrorSources = [
    {
      path: '',
      message: `${extedMessage} is Already Exist`,
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Duplicate Error',
    errorMessage: `{VALUE} is not a valid ID`,
    errorDetails,
  }
}

export default handleDuplicateError