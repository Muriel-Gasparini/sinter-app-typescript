import { httpResponse } from '../protocols'

export const badRequest = (body: string): httpResponse => {
  return {
    status: 400,
    body: body
  }
}
