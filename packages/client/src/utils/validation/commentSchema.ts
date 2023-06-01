import * as yup from 'yup'

const commentSchema = yup.object({
  content: yup
    .string()
    .required('Пожалуйста, введите текст')
    .min(1, 'Текст не может быть короче 1 символа')
    .max(200, 'Текст должен быть короче 200 символов'),
})

export default commentSchema
