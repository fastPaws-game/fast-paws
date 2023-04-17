import { PasswordsFormValues } from '../components/PasswordsPopup'

export type ChangingPasswords = {
  newPassword: string
  oldPassword: string
}

export const mapPasswords = (data: PasswordsFormValues): ChangingPasswords => {
  return {
    newPassword: data.password,
    oldPassword: data.oldPassword,
  }
}
