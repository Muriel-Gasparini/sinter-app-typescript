import { BcryptAdapter } from './bcrypt'

describe('Bcrypt Adapter', () => {
  test('Ensure that the passed password is encrypted ', async () => {
    const sut = new BcryptAdapter()
    const password = 'any_password'
    const hashedPassword = await sut.crypt(password)
    expect(hashedPassword).toBeTruthy()
  })
})
