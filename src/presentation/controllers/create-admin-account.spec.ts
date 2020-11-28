import { CreateAdminAccount } from './create-admin-account'

describe('Create Admin Account', () => {
  test('Should return 400 if empty body is provided', () => {
    const sut = new CreateAdminAccount()
    const httpRequest = {
      body: {}
    }
    const response = sut.handle(httpRequest)
    expect(response.status).toEqual(400)
  })
})
