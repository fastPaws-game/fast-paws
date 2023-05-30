import LayoutWithHeader from '../layouts/LayoutWithHeader'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentsForm'
import { useParams } from 'react-router'

const CommentPage = () => {
  const { topicId } = useParams()

  return (
    <LayoutWithHeader title="Comments">
      <CommentsList topicId={Number(topicId)} />
      <CommentForm topicId={Number(topicId)} />
    </LayoutWithHeader>
  )
}

export default CommentPage
