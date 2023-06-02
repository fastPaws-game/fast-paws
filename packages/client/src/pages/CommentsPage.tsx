import styled from 'styled-components'
import LayoutWithHeader from '../layouts/LayoutWithHeader'
import CommentsHeader from '../components/CommentsHeader'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentsForm'
import { useParams } from 'react-router'

const CommentPage = () => {
  const { topicId } = useParams()

  return (
    <LayoutWithHeader title="Comments">
      <Container>
        <CommentsHeader />
        <Line />
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
  justify-content: space-between;
  align-items: center;
`

const Line = styled.div`
  width: 60%;
  margin-top: 30px;
  border-bottom: 2px solid black;
`

export default CommentPage
