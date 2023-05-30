import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { P1 } from '../assets/styles/texts'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { getTopicById } from '../store/topic/TopicActions'
import { topicsSelectors } from '../store/topic/topicSelectors'
import { commentsSelectors } from '../store/comments/CommentsSelectors'
import CommentItem from '../ui/comment'

type Props = {
  topicId: number
}

const CommentsList: FC<Props> = props => {
  const { topicId } = props
  const dispatch = useAppDispatch()
  const currentTopic = useAppSelector(topicsSelectors.getCurrentTopic)
  const currentCommentStatus = useAppSelector(commentsSelectors.getCommentsStatus)
  const comments = currentTopic?.comments

  useEffect(() => {
    dispatch(getTopicById(topicId))
  }, [currentCommentStatus])

  return (
    <>
      <Container>
        <Paragraf>{currentTopic?.user}</Paragraf>
        <Paragraf>Title: {currentTopic?.title}</Paragraf>
        <Paragraf>{currentTopic?.content}</Paragraf>
      </Container>
      <ListWrapper>
        {comments === undefined || comments.length === 0 ? (
          <Paragraf>No comments</Paragraf>
        ) : (
          comments.map(comment => <CommentItem key={comment.id} comment={comment.content} />)
        )}
      </ListWrapper>
    </>
  )
}

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  list-style-type: none;
  width: 90%;
  padding: 30px;
`

const Paragraf = styled(P1)`
  text-align: center;
  width: 100%;
`
const Container = styled.div`
  width: 100%;
`
export default CommentsList
