import { Document, connect, disconnect } from 'mongoose'

export default {

  async connectToMongo (uri: string): Promise<void> {
    await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  },

  async disconnectMongo (): Promise<void> {
    await disconnect()
  },

  async map (document: Document): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, __v, ...documentWithNoId } = document
    const documentMapped = Object.assign({}, documentWithNoId, { id: _id })
    return documentMapped
  }
}
