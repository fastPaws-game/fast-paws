import { FC } from 'react'
import TextArea, { typeStyleTextArea } from '../ui/textarea'
import Button from '../ui/button'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import commentSchema from '../utils/validation/commentSchema'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'
import { addComment } from '../store/comments/CommentsActions'
import { CommentWithoutIdAndCreatedAtAndUpdatedAt } from '../models/CommentModel'

type Props = {
  topicId: number
}

type TCommentData = {
  content: string
}

const defaultTopicFormValues = {
  content: '',
}

const CommentForm: FC<Props> = props => {
  const { topicId } = props
  const dispatch = useAppDispatch()
  const user = useAppSelector(authSelectors.getUser)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TCommentData>({
    defaultValues: defaultTopicFormValues,
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: yupResolver(commentSchema),
  })

  const prepareDataForComment = (data: TCommentData): CommentWithoutIdAndCreatedAtAndUpdatedAt | undefined => {
    if (!user) {
      return
    }

    return {
      user: user.login,
      topicId: topicId,
      content: data.content,
    }
  }

  const onSubmit: SubmitHandler<TCommentData> = async (data: TCommentData) => {
    const prepareData = prepareDataForComment(data)
    if (prepareData) {
      dispatch(addComment(prepareData))
      reset()
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        placeholder="Topic content"
        typeStyle={typeStyleTextArea.comment}
        errorOn={!!errors.content}
        errorMessage={errors.content?.message}
        {...register('content')}
      />
      <Button size="small" type="submit" disabled={!isDirty || isSubmitting}>
        Send message
      </Button>
    </Form>
  )
}

const Form = styled.form`
  width: 90%;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

export default CommentForm
