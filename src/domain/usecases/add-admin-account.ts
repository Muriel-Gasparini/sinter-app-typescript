import { adminModel } from '../model/admin'

export interface account {
  name: string
  password: string
}

export interface responseAddAdminAccount {
  isError: boolean
  message?: string
  account?: adminModel
}

export interface addAdminAccount {
  add: (account: account) => Promise<responseAddAdminAccount>
}
