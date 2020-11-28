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
    expect(response.status).toBe(400)
    expect(response.body).toBe('It is not possible to send empty data')
  })

  test('Should return 400 if invalid body is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.status).toBe(400)
    expect(response.body).toBe('Make sure you have sent all the required fields')
  })
})
