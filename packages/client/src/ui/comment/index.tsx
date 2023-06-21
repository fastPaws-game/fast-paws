import { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { deleteComment } from '../../store/comments/CommentsActions'
import { P2, P3 } from '../../assets/styles/texts'
import Button from '../button'
import IconReply from '../../assets/icons/IconReply'
import IconEdit from '../../assets/icons/IconEdit'
import IconDelete from '../../assets/icons/IconDelete'
import EditComment from '../../components/EditComment'

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
  const [modal, setModal] = useState(false)

  const handleClose = useCallback(() => {
    setModal(false)
  }, [setModal])

  const handleClick = () => {
    setModal(true)
  }

  const handleReply = () => {
    console.log('Reply')
  }

  const handleDelete = () => {
    dispatch(deleteComment(commentId))
  }

  const handleUpdate = () => {
    console.log('ok')
  }

  return (
    <Item>
      <Container>
        <Topics>{user?.login}</Topics>
        <Topics>{dateAndTime}</Topics>
      </Container>
      <P3>{comment}</P3>
      <Buttons>
        <Button icon={<IconReply />} size={'small'} onClick={handleReply} />
        <Button icon={<IconEdit />} size={'small'} onClick={handleClick} />
        <Button icon={<IconDelete />} size={'small'} onClick={handleDelete} />
        {/* <EditComment visible={modal} outSideClickEnable handleClose={handleClose} commentId={Number(commentId)} /> */}
      </Buttons>
    </Item>
  )
}

const Item = styled.li`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  padding: 15px 30px 15px 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.focus};
  }
`

const Container = styled(P2)`
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 600;
`

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`

const Topics = styled.span`
  padding-right: 15px;
`

export default CommentItem
