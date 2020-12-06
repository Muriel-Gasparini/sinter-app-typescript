import { config } from 'dotenv'

config()

export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 3000,
  keyAdmin: process.env.KEY_ADMIN
}
