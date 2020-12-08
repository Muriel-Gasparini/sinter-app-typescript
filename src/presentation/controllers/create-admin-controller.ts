import { httpRequest, httpResponse, envChecker, addAdminAccount, Controller, bodyValidator } from '../protocols'
import { badRequest, okRequest, serverError } from '../helpers'
import { addadminSchema } from '../../utils/body-validator/schemas/add-admin'

export class CreateAdminController implements Controller {
  private readonly envChecker: envChecker
  private readonly AddAdminAccount: addAdminAccount
  private readonly bodyValidator: bodyValidator

  constructor (envChecker: envChecker, AddAdminAccount: addAdminAccount, bodyValidator: bodyValidator) {
    this.envChecker = envChecker
    this.AddAdminAccount = AddAdminAccount
    this.bodyValidator = bodyValidator
  }

  async handle (request: httpRequest): Promise<httpResponse> {
    try {
      if (Object.keys(request.body).length === 0) return badRequest('It is not possible to send empty data')

      const requiredInputs = ['name', 'password', 'key']

      for (const input of requiredInputs) {
        if (!request.body[input]) return badRequest('Make sure you have sent all the required fields')
      }

      const responseBodyValidator = this.bodyValidator.validate(request.body, addadminSchema)

      if (responseBodyValidator.isError) return badRequest(responseBodyValidator.message)

      const responseEnvChecker = this.envChecker.check(request.body.key)

      if (responseEnvChecker.isError) return badRequest(responseEnvChecker.message)

      const responseAddAdminAccount = await this.AddAdminAccount.add(request.body)

      if (responseAddAdminAccount.isError) return badRequest(responseAddAdminAccount.message)

      return okRequest(responseAddAdminAccount.account)
    } catch (error) {
      if (error.isError) return serverError(error.message)

      return serverError('Sorry a server error occurred')
    }
  }
}
