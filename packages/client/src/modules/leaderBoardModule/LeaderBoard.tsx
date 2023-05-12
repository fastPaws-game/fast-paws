import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/store'
import styled from 'styled-components'
import { PlayerItem } from './PlayerItem'
import { TLeaderboardRequest } from '../../models/LeaderBoardModel'
import { getTeamLeaderboard } from '../../store/leaderboard/LeaderboardActions'
import { leaderboardSelectors } from '../../store/leaderboard/LeaderboardSelectors'
import { LEADERBOARD_CONSTS } from '../../constants/leaderBoard'

const LeaderBoard = () => {
  const dispatch = useAppDispatch()
  const leaderboardItems = useAppSelector(leaderboardSelectors.getLeaderbordItems)

  useEffect(() => {
    const leaderboardRequires: TLeaderboardRequest = {
      ratingFieldName: LEADERBOARD_CONSTS.ratingFieldName,
      cursor: LEADERBOARD_CONSTS.cursor,
      limit: LEADERBOARD_CONSTS.limit,
    }

    dispatch(getTeamLeaderboard(leaderboardRequires))
  }, [])

  return (
    <Wrapper>
      {leaderboardItems?.map((item, index) => {
        const { id, name, points, avatarUrl } = item.data
        return <PlayerItem numbering={index + 1} name={name} points={points} avatarUrl={avatarUrl} key={id} />
      })}
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
