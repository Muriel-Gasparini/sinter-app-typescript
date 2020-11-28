import { EnvCheckerAdapter } from './env-checker-adapter'
import { config } from 'dotenv'

config()

describe('Env Checker Adapter', () => {
  test('ensure that an error returns if the variable is not equal to the key', () => {
    const sut = new EnvCheckerAdapter()
    const httpRequest = {
      body: {
        key: 'invalid_key'
      }
    }
    const responseEnvCheckerAdapter = sut.check(httpRequest.body.key)
    expect(responseEnvCheckerAdapter).toEqual({
      isError: true,
      message: 'The provided key is invalid'
    })
  })

  test('ensure it returns false if the key is correct', () => {
    const sut = new EnvCheckerAdapter()
    const httpRequest = {
      body: {
        key: process.env.KEY_ADMIN
      }
    }
    const responseEnvCheckerAdapter = sut.check(httpRequest.body.key)
    expect(responseEnvCheckerAdapter).toEqual({
      isError: false
    })
  })
})
