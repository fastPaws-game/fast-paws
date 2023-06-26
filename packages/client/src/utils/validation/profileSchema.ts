import * as yup from 'yup'
import { loginRegExp, phoneRegExp } from './regExps'

export const mainProfileSchema = yup.object({
  login: yup
    .string()
    .matches(loginRegExp, 'Логин дожен состоять из латинских букв, может содержать цифры')
    .min(3, 'Логин должен быть длиннее 3 символов')
    .max(20, 'Логин должен короче 20 символов')
    .required('Пожалуйста, укажите логин'),
  first_name: yup.string().min(3, 'Имя должно быть длиннее 3 символов').required('Пожалуйста, укажите имя'),
  second_name: yup.string().min(3, 'Фамилия должна быть длиннее 3 символов').required('Пожалуйста, укажите фамилию'),
  email: yup.string().required('Пожалуйста, введите email').email('Пожалуйста, введите корректный email'),
  phone: yup
    .string()
    .required('Пожалуйста, введите телефон')
    .matches(phoneRegExp, 'Телефон может содержать только цифры и начинаться с +')
    .min(10, 'Номер слишком короткий')
    .max(15, 'Номер слишком длинный'),
})

export const profileSchema = yup
  .object({
    display_name: yup.string().required().min(3, 'Имя должно быть длиннее 3 символов'),
    fileAvatar: yup.mixed(),
  })
  .concat(mainProfileSchema)

profileSchema
