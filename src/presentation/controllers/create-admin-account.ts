import { httpRequest, httpResponse } from '../protocols'
import { badRequest } from '../helpers/bad-request'

export class CreateAdminAccount {
  handle (request: httpRequest): httpResponse {
    if (Object.keys(request.body).length === 0) return badRequest('It is not possible to send empty data')

    const requiredInputs = ['name', 'password', 'key']

    for (const input of requiredInputs) {
      if (!request.body[input]) return badRequest('Make sure you have sent all the required fields')
    }
  }
}
