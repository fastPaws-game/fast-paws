import { FC } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { H3 } from '../assets/styles/texts'
import { yupResolver } from '@hookform/resolvers/yup'
import topicSchema from '../utils/validation/topicSchema'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'
import Button from '../ui/button'
import TextArea, { typeStyleTextArea } from '../ui/textarea'
import Popup from './Popup'
import { CommentUpdPayload, updateComment } from '../store/comments/CommentsActions'
import Input, { typeStyleInput } from '../ui/input'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
  commentId?: number
}

type TFormData = {
  content: string
}

const EditComment: FC<Props> = props => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(authSelectors.getUser)
  const { handleClose, commentId } = props
  const defaultCommentFormValues = { content: '' }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TFormData>({
    defaultValues: defaultCommentFormValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(topicSchema),
  })

  const prepareDataForTopic = (data: TFormData): CommentUpdPayload | undefined => {
    console.log(commentId, data)
    if (!user || !commentId) {
      return
    }

    return {
      id: commentId,
      content: data.content,
    }
  }

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData) => {
    console.log(data)
    const preparedData = prepareDataForTopic(data)
    if (preparedData) {
      dispatch(updateComment(preparedData))
      reset()
      handleClose()
    }
  }

  return (
    <Popup {...props}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <H3>Edit Comment</H3>
        <TextArea
          placeholder="content"
          typeStyle={typeStyleTextArea.modal}
          errorOn={!!errors.content}
          errorMessage={errors.content?.message}
          {...register('content')}
        />
        <Button size="small" type="submit" disabled={!isDirty || isSubmitting}>
          Edit comment
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

export default EditComment
