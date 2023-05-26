import { FC } from 'react'
import styled from 'styled-components'
import Link from '../link'

export type Props = {
  topicName: string
  topicPath: string
  commentsCount: number
}

const TopicItem: FC<Props> = props => {
  const { topicName, topicPath, commentsCount } = props

  return (
    <Item>
      <Link to={topicPath}>{topicName}</Link>
      <Topics>Comments: {commentsCount}</Topics>
      {/* <LastMessage>
        <UserName to={userPath}>{userName}</UserName>
        <Date>{date}</Date>
      </LastMessage> */}
    </Item>
  )
}

const Item = styled.li`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
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

// const LastMessage = styled.div`
//   display: flex;
//   gap: 15px;
// `

// const UserName = styled(Link)`
//   color: ${({ theme }) => theme.text.textInvert} !important;
//   font-weight: 600;
// `

// const Date = styled.span`
//   color: ${({ theme }) => theme.text.textInvert};
// `

export default TopicItem
