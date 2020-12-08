import { bodyValidator, responseBodyValidator } from '../../presentation/protocols'
import { Schema } from 'joi'

export class BodyValidatorAdapter implements bodyValidator {
  validate (body: any, schema: { data: Schema }): responseBodyValidator {
    const { error } = schema.data.validate(body)

    if (error) return { isError: true, message: error.message.replace(/"+/g, '') }

    return {
      isError: false
    }
  }
}
