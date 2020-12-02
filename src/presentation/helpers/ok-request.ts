import { httpResponse } from '../protocols'

export const okRequest = (body: any): httpResponse => {
  return {
    status: 200,
    body: body
  }
}
