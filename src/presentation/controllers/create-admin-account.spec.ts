import { CreateAdminController } from './create-admin-controller'
import { addAdminAccount, account, responseAddAdminAccount } from '../../domain/usecases/add-admin-account'
import { bodyValidator, envChecker, responseBodyValidator, responseEnvChecker } from '../protocols'

const makeAddAdminAccount = (): addAdminAccount => {
  class AddAdminAccountStub implements addAdminAccount {
    async add (account: account): Promise<responseAddAdminAccount> {
      return {
        isError: false,
        account: {
          id: 'any_id',
          name: 'any_name',
          password: 'any_password'
        }
      }
    }
  }
  return new AddAdminAccountStub()
}

const makeBodyValidator = (): bodyValidator => {
  class BodyValidatorStub implements bodyValidator {
    validate (body: any): responseBodyValidator {
      return {
        isError: false
      }
    }
  }
  return new BodyValidatorStub()
}

const makeEnvChecker = (): envChecker => {
  class EnvCheckerStub implements envChecker {
    check (key: string): responseEnvChecker {
      return {
        isError: false
      }
    }
  }
  return new EnvCheckerStub()
}

interface sutTypes {
  sut: CreateAdminController
  envCheckerStub: envChecker
  AddAdminAccountStub: addAdminAccount
  bodyValidatorStub: bodyValidator
}

const makeSut = (): sutTypes => {
  const envCheckerStub = makeEnvChecker()
  const AddAdminAccountStub = makeAddAdminAccount()
  const bodyValidatorStub = makeBodyValidator()
  const sut = new CreateAdminController(envCheckerStub, AddAdminAccountStub, bodyValidatorStub)
  return {
    sut,
    envCheckerStub,
    AddAdminAccountStub,
    bodyValidatorStub
  }
}

describe('Create Admin Account', () => {
  test('Should return 400 if empty body is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const response = await sut.handle(httpRequest)
    expect(response.status).toBe(400)
    expect(response.body).toBe('It is not possible to send empty data')
  })

  test('Should return 400 if invalid body is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.status).toBe(400)
    expect(response.body).toBe('Make sure you have sent all the required fields')
  })

  test('Make sure envChecker return 400 if invalid key is provided', async () => {
    const { sut, envCheckerStub } = makeSut()
    jest.spyOn(envCheckerStub, 'check').mockReturnValueOnce({ isError: true, message: 'The provided key is invalid' })
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        key: 'invalid_key'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.status).toBe(400)
    expect(response.body).toBe('The provided key is invalid')
  })

  test('Make sure return account if AddAdminAccount is called with the correct body', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        key: 'valid_key'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 'any_id',
      name: 'any_name',
      password: 'any_password'
    })
  })

  test('Make sure AddAdminAccount return an error if an error ocurred', async () => {
    const { sut, AddAdminAccountStub } = makeSut()
    // eslint-disable-next-line prefer-promise-reject-errors
    jest.spyOn(AddAdminAccountStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject({ isError: true, message: 'An error occurred while trying to create admin' })))
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        key: 'valid_key'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.status).toBe(500)
    expect(response.body).toBe('An error occurred while trying to create admin')
  })

  test('Make sure bodyValidator is called', async () => {
    const { sut, bodyValidatorStub } = makeSut()
    const bodyValidatorCall = jest.spyOn(bodyValidatorStub, 'validate')
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        key: 'valid_key'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(bodyValidatorCall).toHaveBeenCalledWith(httpRequest.body)
    expect(response.status).toBe(200)
  })
})
