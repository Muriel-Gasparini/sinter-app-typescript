export interface responseBodyValidator {
  isError: boolean
  message?: string
}

export interface bodyValidator {
  validate: (body: any) => responseBodyValidator
}
