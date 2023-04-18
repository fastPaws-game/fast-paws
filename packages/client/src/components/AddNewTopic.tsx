import { FC } from 'react'
import { H3 } from '../assets/styles/texts'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import Popup from './Popup'

type Props = {
  visible: boolean
  handleClose: () => void
  handleSubmit: () => void
  outSideClickEnable?: boolean
}

const AddNewTopic: FC<Props> = props => {
  const { handleSubmit } = props

  return (
    <Popup {...props}>
      <H3>New Topic</H3>
      <Input placeholder="Topic name" typeStyle={typeStyleInput.profile} />
      <Button size="small" onClick={handleSubmit}>
        Add topic
      </Button>
        </Popup>
  )
}



export default AddNewTopic
