import { httpRequest, httpResponse, envChecker, addAdminAccount } from '../protocols'
import { badRequest } from '../helpers/bad-request'

export class CreateAdminAccount {
  private readonly envChecker: envChecker
  private readonly AddAdminAccount: addAdminAccount

  constructor (envChecker: envChecker, AddAdminAccount: addAdminAccount) {
    this.envChecker = envChecker
    this.AddAdminAccount = AddAdminAccount
  }

  async handle (request: httpRequest): Promise<httpResponse> {
    if (Object.keys(request.body).length === 0) return badRequest('It is not possible to send empty data')

    const requiredInputs = ['name', 'password', 'key']

    for (const input of requiredInputs) {
      if (!request.body[input]) return badRequest('Make sure you have sent all the required fields')
    }

    const responseEnvChecker = this.envChecker.check(request.body.key)

    if (responseEnvChecker.isError) return badRequest(responseEnvChecker.message)

    await this.AddAdminAccount.add(request.body)

    return {
      status: 200,
      body: 'The manager account has been created'
    }
  }
}
