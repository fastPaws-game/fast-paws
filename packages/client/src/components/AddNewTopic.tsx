import { FC } from 'react'
import { H3 } from '../assets/styles/texts'
import styled from 'styled-components'
import Button from '../ui/button'
import Input, { typeStyleInput } from '../ui/input'
import Modal from './modal'

type Props = {
    visible: boolean
    handleClose: () => void
    handleSubmit: () => void
    outSideClickEnable?: boolean
}

const AddNewTopic: FC<Props> = (props) => {
    const { handleSubmit } = props;

    return (
        <Modal {...props}>
            <Content>
                <H3>New Topic</H3>
                <Input placeholder='Topic name' typeStyle={typeStyleInput.profile} />
                <Button size='small' onClick={handleSubmit}>Add topic</Button>
            </Content>
        </Modal>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    position: absolute;
    width: 415px;
    height: 210px;
    z-index: 100;
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0px 8px 24px -2px rgba(0, 0, 0, 0.08);
    border-radius: 15px;
    padding: 35px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default AddNewTopic
