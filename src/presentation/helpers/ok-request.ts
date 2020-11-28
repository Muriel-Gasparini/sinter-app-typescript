import { httpResponse } from '../protocols'

export const okRequest = (message: string): httpResponse => {
  return {
    status: 200,
    body: message
  }
}
