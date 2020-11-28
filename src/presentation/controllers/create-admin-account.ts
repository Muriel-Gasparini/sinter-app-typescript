import { httpRequest, httpResponse, envChecker } from '../protocols'
import { badRequest } from '../helpers/bad-request'

export class CreateAdminAccount {
  private readonly envChecker: envChecker

  constructor (envChecker: envChecker) {
    this.envChecker = envChecker
  }

  handle (request: httpRequest): httpResponse {
    if (Object.keys(request.body).length === 0) return badRequest('It is not possible to send empty data')

    const requiredInputs = ['name', 'password', 'key']

    for (const input of requiredInputs) {
      if (!request.body[input]) return badRequest('Make sure you have sent all the required fields')
    }

    const responseEnvChecker = this.envChecker.check(request.body.key)

    if (responseEnvChecker.isError) return badRequest(responseEnvChecker.message)
  }
}
