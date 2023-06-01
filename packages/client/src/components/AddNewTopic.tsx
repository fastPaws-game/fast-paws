import { FC } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { H3 } from '../assets/styles/texts'
import { yupResolver } from '@hookform/resolvers/yup'
import topicSchema from '../utils/validation/topicSchema'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { addTopic } from '../store/topic/TopicActions'
import { authSelectors } from '../store/auth/AuthSelectors'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import TextArea, { typeStyleTextArea } from '../ui/textarea'
import Popup from './Popup'
import { TopicWithoutIdAndComments } from '../models/TopicModel'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
  forumId: number
}

type TFormData = {
  title: string
  content: string
}

const defaultTopicFormValues = {
  title: '',
  content: '',
}

const AddNewTopic: FC<Props> = props => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(authSelectors.getUser)
  const { handleClose, forumId } = props

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TFormData>({
    defaultValues: defaultTopicFormValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(topicSchema),
  })

  const prepareDataForTopic = (data: TFormData): TopicWithoutIdAndComments | undefined => {
    if (!user) {
      return
    }

    return {
      title: data.title,
      content: data.content,
      forumId: forumId,
      user: user.login,
    }
  }

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData) => {
    const prepeareData = prepareDataForTopic(data)
    if (prepeareData) {
      dispatch(addTopic(prepeareData))
      reset()
      handleClose()
    }
  }

  return (
    <Popup {...props}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <H3>New Topic</H3>
        <Input
          placeholder="Topic title"
          typeStyle={typeStyleInput.profile}
          errorOn={!!errors.title}
          errorMessage={errors.title?.message}
          {...register('title')}
        />
        <TextArea
          placeholder="Topic content"
          typeStyle={typeStyleTextArea.modal}
          errorOn={!!errors.content}
          errorMessage={errors.content?.message}
          {...register('content')}
        />
        <Button size="small" type="submit" disabled={!isDirty || isSubmitting}>
          Add topic
        </Button>
      </Form>
    </Popup>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  button {
    margin-top: 15px;
  }

  h3 {
    margin-bottom: 15px;
  }
`

export default AddNewTopic
