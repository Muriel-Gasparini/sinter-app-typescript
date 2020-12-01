import { httpResponse } from '../protocols'

export const serverError = (message: string): httpResponse => {
  return {
    status: 500,
    body: message
  }
}
