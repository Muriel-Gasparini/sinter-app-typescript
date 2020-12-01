import MongoHelper from '../../helpers/mongo-helper'
import { AddAdminMongo } from './add-admin'

describe('AddAdminAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connectToMongo(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnectMongo()
  })
  test('Make sure the account is successfully returned', async () => {
    const sut = new AddAdminMongo()
    const account = {
      name: 'any_name',
      password: 'hashed_password'
    }
    const adminAccount = await sut.add(account)
    expect(adminAccount.id).toBeTruthy()
    expect(adminAccount.name).toEqual(account.name)
    expect(adminAccount.password).toEqual(account.password)
  })
})
