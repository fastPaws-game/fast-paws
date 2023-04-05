import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Topics from '../modules/topics/Topics'
import AddNewTopic from '../components/AddNewTopic'
import { useCallback, useState } from 'react'
import Button from '../ui/button'
import styled from 'styled-components'

const TopicPage = () => {
  const [modal, setModal] = useState(false)

  const handleClose = useCallback(() => {
    setModal(false)
  }, [setModal])

  const handleClick = () => {
    setModal(true)
  }

  return (
    <LayoutWithHeader title="New Games">
      <ButtonAdd onClick={handleClick}>+ Add new topic</ButtonAdd>
      <Topics />
      <AddNewTopic
        visible={modal}
        outSideClickEnable
        handleClose={handleClose}
        handleSubmit={() => console.log('submit')}></AddNewTopic>
    </LayoutWithHeader>
  )
}

const ButtonAdd = styled(Button)`
  margin: 0 5% 0 auto;
  transform: translate(0, -150%);
`

export default TopicPage