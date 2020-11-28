import { httpResponse } from '../protocols'

export const badRequest = (message: string): httpResponse => {
  return {
    status: 400,
    body: message
  }
}
