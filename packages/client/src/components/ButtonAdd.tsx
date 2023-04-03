import styled from 'styled-components'
import Button from '../ui/button'
import { FC } from 'react'

type Props = {
    clickHandler?: () => void
}

const ButtonAdd: FC<Props> = (props) => {
    const { clickHandler } = props
    return <ButtonStyled onClick={clickHandler}>+ Add new topic</ButtonStyled>
}

const ButtonStyled = styled(Button)`
    margin-left: auto;
`

export default ButtonAdd
