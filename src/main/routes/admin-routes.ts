import { Router } from 'express'
import { controllerAdapter } from '../adapters/controller-adapter'
import { makeCreateAdminController } from '../factories/create-admin-controller'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup-admin', controllerAdapter(makeCreateAdminController()))
}
