import { account, addAdminAccount, responseAddAdminAccount } from '../../../domain/usecases/add-admin-account'
import { addAdminAccountRepository, encrypter } from './add-admin-account-protocols'

export class AddAdminAccount implements addAdminAccount {
  private readonly encrypter: encrypter
  private readonly addAdminAccountRepository: addAdminAccountRepository

  constructor (encrypter: encrypter, addAdminAccountRepository: addAdminAccountRepository) {
    this.encrypter = encrypter
    this.addAdminAccountRepository = addAdminAccountRepository
  }

  async add (account: account): Promise<responseAddAdminAccount> {
    try {
      const hashPassword = await this.encrypter.crypt(account.password)

      const { password, ...accountWithNoPassword } = account

      const accountWithHashPassword = Object.assign({}, accountWithNoPassword, { password: hashPassword })

      return {
        isError: false,
        account: await this.addAdminAccountRepository.add(accountWithHashPassword)
      }
    } catch (error) {
      return {
        isError: true,
        message: 'An error occurred while trying to create admin'
      }
    }
  }
}
