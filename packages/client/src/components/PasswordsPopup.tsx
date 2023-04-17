import { FC } from 'react'
import { H3 } from '../assets/styles/texts'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import Popup from './Popup'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
}

const PasswordsPopup: FC<Props> = props => {
  const handleSubmit = () => console.log('555')
  return (
    <Popup {...props}>
      <H3>Passwords</H3>
      <Input placeholder="Topic name" typeStyle={typeStyleInput.profile} />
      <Button size="small" onClick={handleSubmit}>
        Add topic
      </Button>
    </Popup>
  )
}

export default PasswordsPopup
