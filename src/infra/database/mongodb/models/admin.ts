import * as mongoose from 'mongoose'
import { adminModel } from '../../../../domain/model/admin'

export interface IAdmin extends adminModel, mongoose.Document {
  id: string
  name: string
  password: string
}

export const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model<IAdmin>('Admin', AdminSchema)
