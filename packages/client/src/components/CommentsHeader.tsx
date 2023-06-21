import styled from 'styled-components'
import { P1, P2 } from '../assets/styles/texts'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { topicsSelectors } from '../store/topic/topicSelectors'
import { authSelectors } from '../store/auth/AuthSelectors'
import DefaultAvatar from '../assets/icons/DefaultAvatar.svg'
import { deleteTopic } from '../store/topic/TopicActions'
import Button from '../ui/button'
import { useNavigate, useParams } from 'react-router'
import { Routes } from '../constants/routes'
import FetchApi from '../utils/fetchApi'
import { useCallback, useEffect, useState } from 'react'
import IconEdit from '../assets/icons/IconEdit'
import IconDelete from '../assets/icons/IconDelete'
import EditTopicContent from './EditTopicContent'

const CommentHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentTopic = useAppSelector(topicsSelectors.getCurrentTopic)
  const currentUser = useAppSelector(authSelectors.getUser)
  const { topicId } = useParams()
  let [image, setImage] = useState<string>(DefaultAvatar)

  const [modal, setModal] = useState(false)

  const handleClose = useCallback(() => {
    setModal(false)
  }, [setModal])

  const handleClick = () => {
    setModal(true)
  }

  useEffect(() => {
    if (currentTopic) {
      const path = currentTopic.userAvatar
      FetchApi.get(`/resources${path}`)
        .then(() => {
          image = `/api/v2/resources/${path}`
          setImage(image)
        })
        .catch(() => {
          setImage(DefaultAvatar)
        })
    }
  }, [currentTopic])

  const handleDelete = () => {
    if (topicId && currentTopic && currentUser?.login === currentTopic.user) {
      dispatch(deleteTopic(Number(topicId)))
      navigate(Routes.FORUM)
    }
  }

  return (
    <Container>
      <Wrapper>
        <User>
          <Avatar src={image}></Avatar>
          <Name>{currentTopic?.user}</Name>
        </User>
        <Content>{currentTopic?.content}</Content>
      </Wrapper>
      <Buttons>
        <Button icon={<IconEdit />} size={'small'} onClick={handleClick} />
        <Button icon={<IconDelete />} size={'small'} onClick={handleDelete} />
      </Buttons>
      <EditTopicContent visible={modal} outSideClickEnable handleClose={handleClose} topicId={Number(topicId)} />
    </Container>
  )
}

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  list-style-type: none;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
  margin-top: 30px;
`

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  z-index: 0;
`
const Name = styled(P1)`
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 600;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 35px;
`

const Content = styled(P2)`
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 500;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-left: auto;
`

export default CommentHeader
