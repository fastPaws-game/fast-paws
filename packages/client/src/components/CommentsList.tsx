import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { P1 } from '../assets/styles/texts'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { topicsSelectors } from '../store/topic/topicSelectors'
import { getTopicById } from '../store/topic/TopicActions'
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
    <TopicContainer>
      <ListWrapper>
        {comments === undefined || comments.length === 0 ? (
          <Paragraf>No comments</Paragraf>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment.content} createdAt={comment.createdAt} />
          ))
        )}
      </ListWrapper>
    </TopicContainer>
  )
}

const TopicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  height: 100%;
  overflow-y: scroll;
  margin: 30px;
`

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  list-style-type: none;
  width: 100%;
  padding: 0 30px;
`

const Paragraf = styled(P1)`
  text-align: center;
  width: 100%;
`

export default CommentsList
