import { addAdminAccountRepository } from '../../../../data/protocols/add-admin-account-repository'
import { adminModel } from '../../../../domain/model/admin'
import { account } from '../../../../domain/usecases/add-admin-account'
import mongoHelper from '../../helpers/mongo-helper'
import Admin from '../models/admin'

export class AddAdminMongo implements addAdminAccountRepository {
  async add (account: account): Promise<adminModel> {
    const mongoResult = await (await Admin.create(account)).toObject()
    const adminDoc = await mongoHelper.map(mongoResult)
    return adminDoc
  }
}
