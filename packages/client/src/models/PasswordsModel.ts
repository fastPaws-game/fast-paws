export type TChangingPasswords = {
  newPassword: string
  oldPassword: string
}

export const mapPasswords = (data: TPasswordsFormValues): TChangingPasswords => {
  return {
    newPassword: data.password,
    oldPassword: data.oldPassword,
  }
}
export type TPasswordsFormValues = {
  oldPassword: string
  password: string
  repeated_password: string
}
