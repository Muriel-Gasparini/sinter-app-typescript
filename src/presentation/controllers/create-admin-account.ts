import { httpRequest, httpResponse } from '../protocols'

export class CreateAdminAccount {
  handle (request: httpRequest): httpResponse {
    if (Object.keys(request.body).length === 0) {
      return {
        status: 400
      }
    }
  }
}
