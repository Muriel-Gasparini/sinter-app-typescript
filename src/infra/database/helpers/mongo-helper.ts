import Admin from '../mongodb/models/admin'
import { Document } from 'mongoose'

export default {

  async getCollection (name: string): Promise<Document[]> {
    return await Admin.find()
  },

  async map (document: any): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, __v, ...documentWithNoId } = document
    const documentMapped = Object.assign({}, documentWithNoId, { id: _id })
    return documentMapped
  }
}
