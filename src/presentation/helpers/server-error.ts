import { httpResponse } from '../protocols'

export const serverError = (body: string): httpResponse => {
  return {
    status: 500,
    body: body
  }
}
