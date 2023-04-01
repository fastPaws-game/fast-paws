import { FC } from 'react'
import styled from 'styled-components/macro'
import { P1 } from '../../assets/styles/texts'

type Props = {
    avatarUrl: string
    name: string
    rating: number
    points: number
}

const PlayerItem: FC<Props> = (props) => {
    const { avatarUrl, name, rating, points } = props

    return (
        <Wrapper>
            <P1>{rating}.</P1>
            {'AvatarImage'}
            <P1 weight='700'>{name}</P1>
            <P1 weight='300'>{points}</P1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width:100%;
  border-radius: 15px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.secondary};
  min-height: 142px;
  width: 100%;
  max-width: 503px;
  display: flex;
  align-items: center;
  padding: 3% 4%;
  margin: 3%;
  justify-content: space-between;
 `

export default PlayerItem 
