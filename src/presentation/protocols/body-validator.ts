export interface schema {
  data: object
}

export interface responseBodyValidator {
  isError: boolean
  message?: string
}

export interface bodyValidator {
  validate: (body: any, schema: schema) => responseBodyValidator
}
