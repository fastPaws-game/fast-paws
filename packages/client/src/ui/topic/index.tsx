import { FC } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks/store'
import Link from '../link'
import { authSelectors } from '../../store/auth/AuthSelectors'

export type Props = {
  topicName: string
  topicPath: string
  topicContent: string
  commentsCount: number
}

const TopicItem: FC<Props> = props => {
  const user = useAppSelector(authSelectors.getUser)
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
  const { topicName, topicPath, commentsCount, topicContent } = props

  return (
    <Item>
      <Container>
        <Topics>{user?.login}</Topics>
        <Topics>{dateAndTime}</Topics>
        <Container>Title: {topicName}</Container>
      </Container>
      <Container> {topicContent}</Container>
      <Link to={topicPath}>Comments: {commentsCount}</Link>
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

export default TopicItem
