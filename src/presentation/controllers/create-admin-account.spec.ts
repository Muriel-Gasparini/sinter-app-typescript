import { CreateAdminAccount } from './create-admin-account'
import { envChecker, responseEnvChecker } from '../protocols'

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
  sut: CreateAdminAccount
  envCheckerStub: envChecker
}

const makeSut = (): sutTypes => {
  const envCheckerStub = makeEnvChecker()
  const sut = new CreateAdminAccount(envCheckerStub)
  return {
    sut,
    envCheckerStub
  }
}

describe('Create Admin Account', () => {
  test('Should return 400 if empty body is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const response = sut.handle(httpRequest)
    expect(response.status).toBe(400)
    expect(response.body).toBe('It is not possible to send empty data')
  })

  test('Should return 400 if invalid body is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.status).toBe(400)
    expect(response.body).toBe('Make sure you have sent all the required fields')
  })

  test('Make sure envChecker return 400 if invalid key is provided', () => {
    const { sut, envCheckerStub } = makeSut()
    jest.spyOn(envCheckerStub, 'check').mockReturnValueOnce({ isError: true, message: 'The provided key is invalid' })
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        key: 'invalid_key'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.status).toBe(400)
    expect(response.body).toBe('The provided key is invalid')
  })
})
