import { FC } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { H3 } from '../assets/styles/texts'
import { yupResolver } from '@hookform/resolvers/yup'
import topicSchema from '../utils/validation/topicSchema'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { updateTopic } from '../store/topic/TopicActions'
import { authSelectors } from '../store/auth/AuthSelectors'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import TextArea, { typeStyleTextArea } from '../ui/textarea'
import Popup from './Popup'
import { UpdateTopicPayload } from '../api/TopicApi'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
  topicId?: number
}

type TFormData = {
  title: string
  content: string
}

const EditTopicContent: FC<Props> = props => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(authSelectors.getUser)
  const { handleClose, topicId } = props
  const defaultTopicFormValues = { title: '', content: '' }

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

  const prepareDataForTopic = (data: TFormData): { id: number; data: UpdateTopicPayload } | undefined => {
    if (!user || !topicId) {
      return
    }

    return {
      id: topicId,
      data: {
        title: data.title,
        content: data.content,
      },
    }
  }

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData) => {
    const preparedData = prepareDataForTopic(data)
    if (preparedData) {
      dispatch(updateTopic(preparedData))
      reset()
      handleClose()
    }
  }

  return (
    <Popup {...props}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <H3>Edit Topic</H3>
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
          Edit topic
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

export default EditTopicContent
