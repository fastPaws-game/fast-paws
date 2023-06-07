import { useEffect } from 'react'
import ForumsList from '../../components/ForumsList'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { getForums } from '../../store/forum/ForumActions'
import { forumSelectors } from '../../store/forum/ForumSelectors'

const Forum = () => {
  const dispatch = useAppDispatch()
  const forums = useAppSelector(forumSelectors.getForums)

  useEffect(() => {
    dispatch(getForums())
  }, [])

  return <ForumsList forums={forums} />
}

export default Forum
