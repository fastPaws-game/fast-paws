import { FC, useState } from 'react'
import { H3 } from '../assets/styles/texts'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import Popup from './Popup'

type Props = {
  visible: boolean
  handleClose: () => void
  sendMessage: (props: string | number) => void
  outSideClickEnable?: boolean
}

const AddNewTopic: FC<Props> = props => {
  const { sendMessage } = props
  const [message, setMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    sendMessage(message)
  }
  return (
    <Popup {...props}>
      <H3>New Topic</H3>
      <Input
        placeholder="Topic name"
        typeStyle={typeStyleInput.profile}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button size="small" onClick={handleSubmit}>
        Add topic
      </Button>
    </Popup>
  )
}

export default AddNewTopic
