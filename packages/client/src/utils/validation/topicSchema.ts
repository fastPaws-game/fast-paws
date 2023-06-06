import * as yup from 'yup'

const topicSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Заголовок должен быть длиннее 3 символов')
    .max(20, 'Заголовок должен быть короче 20 символов')
    .required('Пожалуйста, укажите заголовок'),
  content: yup
    .string()
    .required('Пожалуйста, введите текст')
    .min(1, 'Текст не может быть короче 1 символа')
    .max(200, 'Текст должен быть короче 200 символов'),
})

export default topicSchema
