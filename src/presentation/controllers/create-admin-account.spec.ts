import { CreateAdminAccount } from './create-admin-account'
import { addAdminAccount, account } from '../../domain/usecases/add-admin-account'
import { adminModel } from '../../domain/model/admin'
import { envChecker, responseEnvChecker } from '../protocols'

const makeAddAdminAccount = (): addAdminAccount => {
  class AddAdminAccountStub implements addAdminAccount {
    add (account: account): adminModel {
      return {
        id: 'any_id',
        name: 'any_name',
        password: 'any_password'
      }
    }
  }
  return new AddAdminAccountStub()
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
  sut: CreateAdminAccount
  envCheckerStub: envChecker
  AddAdminAccountStub: addAdminAccount
}

const makeSut = (): sutTypes => {
  const envCheckerStub = makeEnvChecker()
  const AddAdminAccountStub = makeAddAdminAccount()
  const sut = new CreateAdminAccount(envCheckerStub, AddAdminAccountStub)
  return {
    sut,
    envCheckerStub,
    AddAdminAccountStub
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

  test('Make sure AddAdminAccount is called if the correct body is sent', () => {
    const { sut, AddAdminAccountStub } = makeSut()
    const AddAdminAccountStubRequest = jest.spyOn(AddAdminAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        key: 'valid_key'
      }
    }
    const response = sut.handle(httpRequest)
    expect(AddAdminAccountStubRequest).toHaveBeenCalledWith(httpRequest.body)
    expect(response.status).toBe(200)
    expect(response.body).toBe('The manager account has been created')
  })
})
