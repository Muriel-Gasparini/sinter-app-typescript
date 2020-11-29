import { connect, disconnect } from 'mongoose'
import { AddAdminMongo } from './add-admin'

describe('AddAdminAccountRepository', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  })
  afterAll(async () => {
    await disconnect()
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
