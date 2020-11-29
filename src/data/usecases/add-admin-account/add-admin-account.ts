import { adminModel } from '../../../domain/model/admin'
import { account, addAdminAccount } from '../../../domain/usecases/add-admin-account'
import { addAdminAccountRepository, encrypter } from './add-admin-account-protocols'

export class AddAdminAccount implements addAdminAccount {
  private readonly encrypter: encrypter
  private readonly addAdminAccountRepository: addAdminAccountRepository

  constructor (encrypter: encrypter, addAdminAccountRepository: addAdminAccountRepository) {
    this.encrypter = encrypter
    this.addAdminAccountRepository = addAdminAccountRepository
  }

  async add (account: account): Promise<adminModel> {
    const hash = await this.encrypter.crypt(account.password)

    const { password, ...accountWithNoPassword } = account

    const accountWithHashPassword = Object.assign({}, accountWithNoPassword, { password: hash })

    const adminAccount = await this.addAdminAccountRepository.add(accountWithHashPassword)

    return adminAccount
  }
}
