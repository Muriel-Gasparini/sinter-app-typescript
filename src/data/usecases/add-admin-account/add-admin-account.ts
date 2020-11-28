import { adminModel } from '../../../domain/model/admin'
import { account, addAdminAccount } from '../../../domain/usecases/add-admin-account'
import { encrypter } from './add-admin-account-protocols'

export class AddAdminAccount implements addAdminAccount {
  private readonly encrypter: encrypter

  constructor (encrypter: encrypter) {
    this.encrypter = encrypter
  }

  async add (account: account): Promise<adminModel> {
    await this.encrypter.crypt(account.password)
    return {
      id: 'any_id',
      name: 'any_name',
      password: 'any_password'
    }
  }
}
