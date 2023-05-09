import Button from '../ui/button'
import IconYandex from '../assets/icons/IconYandex'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { getServiceId } from '../store/auth/AuthActions'
import { authSelectors } from '../store/auth/AuthSelectors'

const OAuth = () => {
  const dispatch = useAppDispatch()
  const serviceIdStatus = useAppSelector(authSelectors.getServiceIdStatus)

  const handleClick = () => {
    dispatch(getServiceId())
  }

  return (
    <>
      <ButtonStyled onClick={handleClick}>
        Log in with
        <IconYandex />
      </ButtonStyled>
      {serviceIdStatus === 'error' && <Error>Server error</Error>}
    </>
  )
}

const ButtonStyled = styled(Button)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  gap: 5px;
`

const Error = styled.p`
  color: ${props => props.theme.text.error};
  margin-top: 10px;
`

export default OAuth
