import styled from 'styled-components'
import { P1 } from '../assets/styles/texts'
import TopicItem from '../ui/topic'
import { Routes } from '../constants/routes'
import { useAppSelector } from '../hooks/store'
import { forumSelectors } from '../store/forum/ForumSelectors'

const TopicsList = () => {
  const currentForum = useAppSelector(forumSelectors.getCurrentForum)

  return (
    <TopicsContainer>
      <ListWrapper>
        {currentForum && currentForum.topics.length !== 0 ? (
          currentForum.topics.map(topic => (
            <TopicItem
              key={topic.id}
              topicId={topic.id}
              topicName={topic.title}
              topicPath={`${Routes.FORUM}/${Routes.TOPIC}/${topic.id}`}
              topicContent={topic.content}
              commentsCount={topic.commentsCount}
              userName={topic.lastMessage?.user}
              date={topic.lastMessage?.createdAt}
            />
          ))
        ) : (
          <Title>No Topics</Title>
        )}
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
  gap: 15px;
  list-style-type: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
  width: 90%;
  max-height: 90%;
  overflow-y: scroll;
  padding: 10px 20px;
`

const Title = styled(P1)`
  text-align: center;
  width: 100%;
`

export default TopicsList
