import { encrypter, addAdminAccountRepository } from './add-admin-account-protocols'
import { AddAdminAccount } from './add-admin-account'
import { adminModel } from '../../../domain/model/admin'
import { account } from '../../../domain/usecases/add-admin-account'

const makeEncrypter = (): encrypter => {
  class EncrypterStub implements encrypter {
    async crypt (password: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAdminAccountRepository = (): addAdminAccountRepository => {
  class AddAdminAccountRepositoryStub implements addAdminAccountRepository {
    async add (account: account): Promise<adminModel> {
      return await new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password'
      }))
    }
  }
  return new AddAdminAccountRepositoryStub()
}

interface sutTypes {
  sut: AddAdminAccount
  EncrypterStub: encrypter
  AddAdminAccountRepositoryStub: addAdminAccountRepository
}

const makeSut = (): sutTypes => {
  const EncrypterStub = makeEncrypter()
  const AddAdminAccountRepositoryStub = makeAddAdminAccountRepository()
  const sut = new AddAdminAccount(EncrypterStub, AddAdminAccountRepositoryStub)
  return {
    sut,
    EncrypterStub,
    AddAdminAccountRepositoryStub
  }
}

describe('AddAdminAccount', () => {
  test('ensure that the encrypter is called with the correct password', async () => {
    const { sut, EncrypterStub } = makeSut()
    const encrypterStubCall = jest.spyOn(EncrypterStub, 'crypt')
    const account = {
      name: 'any_name',
      password: 'any_password'
    }
    await sut.add(account)
    expect(encrypterStubCall).toHaveBeenCalledWith(account.password)
  })

  test('ensure that AddAdminAccountRepository is called with the account containing the encrypted password', async () => {
    const { sut, AddAdminAccountRepositoryStub } = makeSut()
    const StubCall = jest.spyOn(AddAdminAccountRepositoryStub, 'add')
    const account = {
      name: 'any_name',
      password: 'any_password'
    }
    const response = await sut.add(account)
    expect(StubCall).toHaveBeenCalledWith({
      name: 'any_name',
      password: 'hashed_password'
    })
    expect(response).toEqual({
      isError: false,
      account: {
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password'
      }
    })
  })
})
