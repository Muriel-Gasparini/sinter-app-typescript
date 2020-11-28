export interface responseEnvChecker {
  isError: boolean
  message?: string
}

export interface envChecker {
  check: (key: string) => responseEnvChecker
}
