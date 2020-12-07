import { Controller, httpRequest, httpResponse } from '../../presentation/protocols/'
import { Response, Request } from 'express'

export const controllerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: httpRequest = {
      body: req.body
    }
    const httpResponse: httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.status).json(httpResponse.body)
  }
}
