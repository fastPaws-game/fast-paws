import { FC } from 'react'
import styled from 'styled-components'
import Link from '../link'

export type Props = {
  topicId: number
  topicName: string
  topicPath: string
  topicContent: string
  commentsCount: number
  userName?: string
  date?: string
}

const TopicItem: FC<Props> = props => {
  const { topicName, topicPath, commentsCount, userName, date } = props
  const prepareDate = (): string => {
    if (date) {
      const result = new Date(date).toLocaleString()
      return result
    }
    return ''
  }

  return (
    <Item>
      <Link to={topicPath}>{topicName}</Link>
      <Topics>Comments: {commentsCount}</Topics>
      <LastMessage>
        {date ? 'Last comment:' : ''}
        <UserName>{userName}</UserName>
        <DateSpan>{prepareDate()}</DateSpan>
      </LastMessage>
    </Item>
  )
}

const Item = styled.li`
  display: grid;
  grid-template-columns: 4fr 1fr 2fr;
  padding: 10px;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.focus};
  }
`

const Topics = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`

const LastMessage = styled.div`
  color: ${({ theme }) => theme.text.textInvert};
  display: flex;
  gap: 15px;
`

const UserName = styled.p`
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 600;
  :last-child {
    margin-left: auto;
  }
`

const DateSpan = styled.span`
  color: ${({ theme }) => theme.text.textInvert};
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
