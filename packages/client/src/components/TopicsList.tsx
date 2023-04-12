import { FC } from 'react'
import styled from 'styled-components'
import TopicItem, { Props as TopicProps } from '../ui/topic'

type Props = {
  topics: Array<TopicProps>
}

const TopicsList: FC<Props> = props => {
  const { topics } = props

  return (
    <TopicsContainer>
      <ListWrapper>
        {topics.length === 0
          ? 'No topics'
          : topics.map((topic, index) => <TopicItem key={index} {...topic} />)}
      </ListWrapper>
    </TopicsContainer>
  )
}

const TopicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 80vh;
`

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  list-style-type: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
  width: 90%;
  max-height: 90%;
  overflow-y: scroll;
  padding: 10px 20px;
`

export default TopicsList
