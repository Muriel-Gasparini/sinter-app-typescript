import { adminModel } from '../model/admin'

export interface account {
  name: string
  password: string
}

export interface addAdminAccount {
  add: (account: account) => Promise<adminModel>
}
