import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { routes } from '../../constants/routes'
import Button from '../../ui/button'
import { PlayerItem } from './PlayerItem'

const LeaderBoard = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(routes.home);
    }
  }

  return (
    <Wrapper>
      <ButtonBack
        icon={<h1>&lt;</h1>}
        size={'small'}
        onClick={handleClick}
      />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
    </Wrapper>
  )
}

const ButtonBack = styled(Button)`
  position: fixed;
  left: 0.8em;
  top: 0.8em;

  @media screen and (max-width: 600px) {
    width:45px;
    height: 45px;
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
  width: 100%;
  justify-items: center;
  padding: 15px;

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr
  }
`
export { LeaderBoard }
