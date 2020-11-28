import { encrypter } from './add-admin-account-protocols'
import { AddAdminAccount } from './add-admin-account'

const makeEncrypter = (): encrypter => {
  class EncrypterStub implements encrypter {
    async crypt (password: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

interface sutTypes {
  sut: AddAdminAccount
  EncrypterStub: encrypter
}

const makeSut = (): sutTypes => {
  const EncrypterStub = makeEncrypter()
  const sut = new AddAdminAccount(EncrypterStub)
  return {
    sut,
    EncrypterStub
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
})
