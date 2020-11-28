import { CreateAdminAccount } from './create-admin-account'

const makeSut = (): CreateAdminAccount => {
  return new CreateAdminAccount()
}

describe('Create Admin Account', () => {
  test('Should return 400 if empty body is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {}
    }
    const response = sut.handle(httpRequest)
    expect(response.status).toEqual(400)
  })
})
