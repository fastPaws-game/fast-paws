import { FC, useEffect } from 'react'
import TopicsList from '../../components/TopicsList'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { forumSelectors } from '../../store/forum/ForumSelectors'
import { getForumById } from '../../store/forum/ForumActions'

type Props = {
  forumId: number
}

const Topics: FC<Props> = props => {
  const { forumId } = props
  const dispatch = useAppDispatch()
  const currentForum = useAppSelector(forumSelectors.getCurrentForum)
  let topics
  if (!currentForum) {
    topics = []
  } else {
    topics = currentForum.topics
  }

  useEffect(() => {
    dispatch(getForumById(forumId))
  }, [])

  return <TopicsList topics={topics} />
}

export default Topics
