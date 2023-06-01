import { FC } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { deleteTopic } from '../../store/topic/TopicActions'
import Link from '../link'
import { authSelectors } from '../../store/auth/AuthSelectors'

export type Props = {
  topicId: number
  topicName: string
  topicPath: string
  topicContent: string
  commentsCount: number
}

const TopicItem: FC<Props> = props => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(authSelectors.getUser)
  const { topicId, topicName, topicPath, commentsCount, topicContent } = props

  const handleDelete = () => {
    dispatch(deleteTopic(topicId))
  }

  const handleUpdate = () => {
    console.log('ok')
  }

  return (
    <Item>
      <Container>
        {user?.login}
        <Container>Title: {topicName}</Container>
      </Container>
      <Container> {topicContent}</Container>
      <Link to={topicPath}>Comments: {commentsCount}</Link>
      <Container>
        <Button onClick={handleUpdate}>Update</Button>
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
`

const Button = styled.button`
  width: 5%;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 600;
  margin-right: 10px;
`
export default TopicItem
