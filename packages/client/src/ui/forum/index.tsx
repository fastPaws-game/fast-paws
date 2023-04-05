import { FC } from 'react'
import styled from 'styled-components'
import Link from '../link'

export type Props = {
  forumName: string
  forumPath: string
  topics: number
}

const ForumItem: FC<Props> = props => {
  const { forumName, forumPath, topics } = props

  return (
    <Item>
      <Link to={forumPath}>{forumName}</Link>
      <Topics>Topics: {topics}</Topics>
    </Item>
  )
}

const Item = styled.li`
  display: grid;
  grid-template-columns: 4fr 1fr;
  padding: 15px 30px 15px 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
`

const Topics = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`

export default ForumItem
