import { httpRequest, httpResponse } from './index'

export interface Controller {
  handle: (httpRequest: httpRequest) => Promise<httpResponse>
}
