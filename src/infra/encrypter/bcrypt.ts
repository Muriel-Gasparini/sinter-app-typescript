import { encrypter } from '../../data/protocols/encrypter'
import { hash } from 'bcrypt'

export class BcryptAdapter implements encrypter {
  async crypt (password: string): Promise<string> {
    const hashedPassword = await hash(password, 10)

    return await new Promise(resolve => resolve(hashedPassword))
  }
}
