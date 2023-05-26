import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Topics from '../modules/topics/Topics'
import AddNewTopic from '../components/AddNewTopic'
import { useCallback, useState } from 'react'
import Button from '../ui/button'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useAppDispatch } from '../hooks/store'
import { addTopic } from '../store/topic/TopicActions'

const TopicPage = () => {
  const dispatch = useAppDispatch()
  const { forumId } = useParams()
  const [modal, setModal] = useState(false)

  const handleClose = useCallback(() => {
    setModal(false)
  }, [setModal])

  const handleClick = () => {
    setModal(true)
  }

  const sendMessage = props => {
    dispatch(addTopic(props))
  }

  return (
    <LayoutWithHeader title="New Games">
      <ButtonAdd onClick={handleClick}>+ Add new topic</ButtonAdd>
      <Topics forumId={Number(forumId)} />
      <AddNewTopic visible={modal} outSideClickEnable handleClose={handleClose} sendMessage={sendMessage}></AddNewTopic>
    </LayoutWithHeader>
  )
}

const ButtonAdd = styled(Button)`
  margin: 0 5% 0 auto;
  transform: translate(0, -150%);
`

export default TopicPage
