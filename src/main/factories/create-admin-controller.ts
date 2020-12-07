import { CreateAdminController } from '../../presentation/controllers/create-admin-controller'
import { EnvCheckerAdapter } from '../../utils/env-checker-adapter'
import { AddAdminAccount } from '../../data/usecases/add-admin-account/add-admin-account'
import { BcryptAdapter } from '../../infra/encrypter/bcrypt'
import { AddAdminMongo } from '../../infra/database/mongodb/admin-repository/add-admin'

export const makeCreateAdminController = (): CreateAdminController => {
  const addAdmin = new AddAdminMongo()
  const encrypter = new BcryptAdapter()
  const addAdminAccount = new AddAdminAccount(encrypter, addAdmin)
  const envChecker = new EnvCheckerAdapter()
  const controller = new CreateAdminController(envChecker, addAdminAccount)
  return controller
}
