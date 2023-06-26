import * as yup from 'yup'
import { passwordRegExp } from './regExps'

export const passwordsSchema = yup.object({
  oldPassword: yup
    .string()
    .matches(passwordRegExp, 'Должен содержать хотя бы одну заглавную букву и цифру')
    .required('Пожалуйста, введите пароль')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль должен быть короче 40 символов'),
  password: yup
    .string()
    .matches(passwordRegExp, 'Должен содержать хотя бы одну заглавную букву и цифру')
    .required('Пожалуйста, введите пароль')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль должен быть короче 40 символов'),
  repeated_password: yup
    .string()
    .required('Пожалуйста, повторите пароль')
    .oneOf([yup.ref('password')], 'Введенные пароли не совпадают'),
})
