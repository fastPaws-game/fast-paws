import { FC } from 'react'
import styled from 'styled-components'
import Button from '../../ui/button'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { deleteComment } from '../../store/comments/CommentsActions'
type Props = {
  commentId: number
  comment: string
  createdAt: string
}

const CommentItem: FC<Props> = props => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(authSelectors.getUser)
  const { commentId, comment, createdAt } = props
  const now = new Date(createdAt)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }
  const dateAndTime = now.toLocaleString('ru-RU', options)

  const handleDelete = () => {
    dispatch(deleteComment(commentId))
  }

  return (
    <Item>
      <Container>
        <Topics>{user?.login}</Topics>
        <Topics>{dateAndTime}</Topics>
      </Container>
      <Container>{comment}</Container>
      <Container>
        <Button onClick={handleDelete}>Delete</Button>
      </Container>
    </Item>
  )
}

const Item = styled.li`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 15px;
  padding: 15px 30px 15px 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.focus};
  }
`

const Container = styled.div`
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 600;
  &:last-child {
    margin-left: auto;
  }
`

const Topics = styled.span`
  padding-right: 15px;
`

export default CommentItem
