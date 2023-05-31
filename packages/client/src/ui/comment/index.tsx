import { FC } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks/store'
import { authSelectors } from '../../store/auth/AuthSelectors'

type Props = {
  comment: string
}

const CommentItem: FC<Props> = props => {
  const user = useAppSelector(authSelectors.getUser)
  const { comment } = props
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }
  const dateAndTime = now.toLocaleString('en-US', options)
  const handleReply = () => {
    console.log('Reply')
  }

  return (
    <Item>
      <Container>
        <Topics>{user?.login}</Topics>
        <Topics>{dateAndTime}</Topics>
      </Container>
      <Container>{comment}</Container>
      <Reply onClick={handleReply}>Reply</Reply>
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
`

const Topics = styled.span`
  padding-right: 15px;
`

const Reply = styled.button`
  width: 5%;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 600;
`

export default CommentItem
