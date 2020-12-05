import { Express } from 'express'
import { bodyParser, helmetSec } from '../middlewares/'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(helmetSec)
}
