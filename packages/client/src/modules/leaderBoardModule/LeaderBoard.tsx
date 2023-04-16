import styled from 'styled-components'
import { PlayerItem } from './PlayerItem'
import LayoutWithHeader from '../../layouts/LayoutWithHeader'

export type PlayerItemType = {
  id: number
  name: string
  rating: number
  points: number
  avatarUrl?: string | null
}

const mockPlayerList: PlayerItemType[] = [
  {
    id: 0,
    name: 'Босс',
    rating: 1,
    points: 520,
    avatarUrl: 'https://nretnil.com/avatar/LawrenceEzekielAmos.png',
  },
  { id: 1, name: 'Крутой кошак', rating: 1, points: 520 },
  { id: 2, name: 'Крутой кошак', rating: 1, points: 520 },
  { id: 3, name: 'Крутой кошак', rating: 1, points: 520 },
  { id: 4, name: 'Крутой кошак', rating: 1, points: 520 },
  { id: 5, name: 'Крутой кошак', rating: 1, points: 520 },
]

const LeaderBoard = () => {
  return (
      <Wrapper>
        {mockPlayerList.map(item => (
          <PlayerItem
            name={item.name}
            rating={item.rating}
            points={item.points}
            avatarUrl={item.avatarUrl || null}
            key={item.id}
          />
        ))}
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
export { LeaderBoard }
