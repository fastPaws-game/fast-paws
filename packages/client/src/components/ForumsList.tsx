import styled from 'styled-components'
import { FC } from 'react'
import ForumItem from '../ui/forum'
import { Routes } from '../constants/routes'

type ForumData = {
  name: string
  id: number
  topics: number
}

type Props = {
  forums: Array<ForumData>
}

const ForumsList: FC<Props> = props => {
  const { forums } = props

  return (
    <ListWrapper>
      {forums.map(forum => (
        <ForumItem
          forumName={forum.name}
          key={forum.id}
          forumPath={`${Routes.FORUM}/${forum.id}`}
          topics={forum.topics}
        />
      ))}
    </ListWrapper>
  )
}

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  list-style-type: none;
  width: 100%;
  padding: 30px;
  z-index: 1;
`

export default ForumsList
