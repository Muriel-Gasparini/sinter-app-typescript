import { httpRequest, httpResponse } from '../protocols'

export class CreateAdminAccount {
  handle (request: httpRequest): httpResponse {
    const requiredInputs = ['name', 'password', 'key']

    for (const input of requiredInputs) {
      if (!request.body[input]) return { status: 400 }
    }

    if (Object.keys(request.body).length === 0) {
      return {
        status: 400
      }
    }
  }
}
