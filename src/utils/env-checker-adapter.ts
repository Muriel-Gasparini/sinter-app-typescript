import { envChecker, responseEnvChecker } from '../presentation/protocols/env-checker'
import { config } from 'dotenv'

config()

export class EnvCheckerAdapter implements envChecker {
  check (key: string): responseEnvChecker {
    if (key !== process.env.KEY_ADMIN) return { isError: true, message: 'The provided key is invalid' }

    return {
      isError: false
    }
  }
}
