import * as yup from 'yup'
import { mainProfileSchema } from './profileSchema'
import { passwordRegExp } from './regExps'

const passwordsSchema = yup.object({
  password: yup
    .string()
    .matches(passwordRegExp, 'Пароль дожен содержать хотя бы одну заглавную букву и цифру')
    .required('Пожалуйста, введите пароль')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль должен быть короче 40 символов'),
  repeated_password: yup
    .string()
    .required('Пожалуйста, повторите пароль')
    .oneOf([yup.ref('password')], 'Введенные пароли не совпадают'),
})

const registrationSchema = passwordsSchema.concat(mainProfileSchema)

export { registrationSchema }
