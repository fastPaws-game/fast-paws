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

  const mockPlayerList = [
    {
      id: 0,
      name: "Босс", rating: 1, points: 520,
      avatarUrl: 'https://nretnil.com/avatar/LawrenceEzekielAmos.png'
    },
    { id: 1, name: "Крутой кошак", rating: 1, points: 520 },
    { id: 2, name: "Крутой кошак", rating: 1, points: 520 },
    { id: 3, name: "Крутой кошак", rating: 1, points: 520 },
    { id: 4, name: "Крутой кошак", rating: 1, points: 520 },
    { id: 5, name: "Крутой кошак", rating: 1, points: 520 }
  ]

  return (
    <Wrapper>
      <ButtonBack
        icon={<h1>&lt;</h1>}
        size={'small'}
        onClick={handleClick}
      />
      {mockPlayerList.map(item => <PlayerItem
        name={item.name}
        rating={item.rating}
        points={item.points}
        avatarUrl={item.avatarUrl || null}
        key={item.id}
      />)}
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
