import { adminModel } from '../../domain/model/admin'
import { account } from '../../domain/usecases/add-admin-account'

export interface addAdminAccountRepository {
  add: (account: account) => Promise<adminModel>
}
