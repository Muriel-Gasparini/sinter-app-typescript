import { httpRequest, httpResponse, envChecker, addAdminAccount, Controller } from '../protocols'
import { badRequest, okRequest, serverError } from '../helpers'

export class CreateAdminController implements Controller {
  private readonly envChecker: envChecker
  private readonly AddAdminAccount: addAdminAccount

  constructor (envChecker: envChecker, AddAdminAccount: addAdminAccount) {
    this.envChecker = envChecker
    this.AddAdminAccount = AddAdminAccount
  }

  async handle (request: httpRequest): Promise<httpResponse> {
    try {
      if (Object.keys(request.body).length === 0) return badRequest('It is not possible to send empty data')

      const requiredInputs = ['name', 'password', 'key']

      for (const input of requiredInputs) {
        if (!request.body[input]) return badRequest('Make sure you have sent all the required fields')
      }

      const responseEnvChecker = this.envChecker.check(request.body.key)

      if (responseEnvChecker.isError) return badRequest(responseEnvChecker.message)

      const responseAddAdminAccount = await this.AddAdminAccount.add(request.body)

      return okRequest(responseAddAdminAccount.account)
    } catch (error) {
      if (error.isError) return serverError(error.message)

      return serverError('Sorry a server error occurred')
    }
  }
}
