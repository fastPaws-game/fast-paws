import styled from 'styled-components'
import { P1 } from '../assets/styles/texts'
import { useAppSelector } from '../hooks/store'
import { topicsSelectors } from '../store/topic/topicSelectors'

const CommentHeader = () => {
  const currentTopic = useAppSelector(topicsSelectors.getCurrentTopic)
  return (
    <Container>
      <Paragraf>{currentTopic?.user}</Paragraf>
      <Paragraf>Title: {currentTopic?.title}</Paragraf>
      <Paragraf>{currentTopic?.content}</Paragraf>
    </Container>
  )
}

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  list-style-type: none;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.topic};
  border-radius: 16px;
  margin-top: 30px;
`

const Paragraf = styled(P1)`
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.text.textInvert};
  font-weight: 600;
`

export default CommentHeader
