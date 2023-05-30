import { FC, useEffect } from 'react'
import TopicsList from '../../components/TopicsList'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { getForumById } from '../../store/forum/ForumActions'
import { topicsSelectors } from '../../store/topic/topicSelectors'

type Props = {
  forumId: number
}

const Topics: FC<Props> = props => {
  const { forumId } = props
  const dispatch = useAppDispatch()
  const currentTopicStatus = useAppSelector(topicsSelectors.getCurrentTopicStatus)

  useEffect(() => {
    dispatch(getForumById(forumId))
  }, [currentTopicStatus])

  return <TopicsList />
}

export default Topics
