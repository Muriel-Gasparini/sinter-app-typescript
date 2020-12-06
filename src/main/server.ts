import MongoHelper from '../infra/database/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connectToMongo(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => { console.warn(`Server On Port ${env.port}`) })
  })
  .catch((err) => { console.error(err) })
