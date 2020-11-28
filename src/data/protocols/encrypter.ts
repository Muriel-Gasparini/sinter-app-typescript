export interface encrypter {
  crypt: (password: string) => Promise<string>
}
