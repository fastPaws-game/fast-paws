import styled from 'styled-components/macro'
import PlayerItem from './PlayerItem'

const LiderBord = () => {
  return (
    <Wrapper>
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
      <PlayerItem name="Крутой кошак" rating={1} points={520} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
  width: 100%;
  justify-items: center;
  padding: 15px;

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`
export default LiderBord
