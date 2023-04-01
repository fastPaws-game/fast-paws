import { FC } from 'react'
import styled from 'styled-components/macro'
import { P1 } from '../../assets/styles/texts'
import defaultAvatar from '../../assets/images/catAvatar.png'
import { media } from '../../assets/styles/media'

type Props = {
  avatarUrl?: string
  name: string
  rating: number
  points: number
}

const PlayerItem: FC<Props> = props => {
  const { avatarUrl, name, rating, points } = props

  return (
    <Wrapper>
      <P>{rating}.</P>
      <AvatarImage avatarUrl={avatarUrl || null}>
        <img src={avatarUrl || defaultAvatar} alt="" />
      </AvatarImage>
      <P weight="700">{name}</P>
      <P weight="300">{points}</P>
    </Wrapper>
  )
}

const P = styled(P1)`
&:nth-of-type(2) {
  ${media.small} {
    font-size: ${({ theme }) => theme.vars.fontSize.s};
  }
}
  @media screen and (max-width: 450px) {
    font-size: ${({ theme }) => theme.vars.fontSize.s};
  }
`
const Wrapper = styled.div`
  width: 100%;
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
  gap: 10px;

  ${media.small} {
    min-height: 60px;
  }
`
const AvatarImage = styled.div<{ avatarUrl: string | null }>`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.vars.colors.lightest};
  width: 85px;
  height: 85px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;

  ${media.middle} {
    width: 52px;
    height: 52px;
  }

  img {
    width: 100%;
    height: ${({ avatarUrl }) =>
    typeof avatarUrl === 'string' ? '100%' : `auto`};
    object-fit: cover;
  }
`
export default PlayerItem
