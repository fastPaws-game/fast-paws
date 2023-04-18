export type TSignUp = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type TSignUpFormValues = {
  login: string
  email: string
  first_name: string
  second_name: string
  phone: string | number
  password: string
  repeated_password: string
}
