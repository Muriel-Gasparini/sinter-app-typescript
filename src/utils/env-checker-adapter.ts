import { envChecker, responseEnvChecker } from '../presentation/protocols/env-checker'
import { config } from 'dotenv'

config()

export class EnvCheckerAdapter implements envChecker {
  check (key: string): responseEnvChecker {
    const adminKey = process.env.KEY_ADMIN

    if (key !== adminKey) return { isError: true, message: 'The provided key is invalid' }

    return {
      isError: false
    }
  }
}
