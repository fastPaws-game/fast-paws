import styled from 'styled-components'
import LayoutWithHeader from '../layouts/LayoutWithHeader'
import CommentsHeader from '../components/CommentsHeader'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentsForm'
import { useParams } from 'react-router'
import { topicsSelectors } from '../store/topic/topicSelectors'
import { useAppSelector } from '../hooks/store'

const CommentPage = () => {
  const currentTopic = useAppSelector(topicsSelectors.getCurrentTopic)
  const { topicId } = useParams()

  return (
    <LayoutWithHeader title={currentTopic?.title}>
      <Container>
        <CommentsHeader />
        <CommentsList topicId={Number(topicId)} />
        <CommentForm topicId={Number(topicId)} />
      </Container>
    </LayoutWithHeader>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export default CommentPage
