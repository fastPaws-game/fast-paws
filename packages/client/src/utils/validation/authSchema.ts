import * as yup from 'yup'
import { loginRegExp, passwordRegExp } from './regExps'

//TODO подключить схему валидации в форму авторизации, когда она будет готова в рамках другой задачи

const authSchema = yup.object({
  login: yup
    .string()
    .matches(loginRegExp, 'Пожалуйста, укажите корректный логин')
    .min(3, 'Логин должен быть длиннее 3 символов')
    .max(20, 'Логин должен короче 20 символов')
    .required('Пожалуйста, укажите логин'),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Пароль дожен содержать хотя бы одну заглавную букву и цифру'
    )
    .required('Пожалуйста, введите пароль')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль должен быть короче 40 символов'),
})

export default authSchema
