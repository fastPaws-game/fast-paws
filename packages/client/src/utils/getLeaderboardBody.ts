import { leaderboardConstants } from '../constants/leaderBoard'
import { TUser } from '../models/UserModel'

const getLeaderboarBody = (user: TUser, score: number) => {
  const body = {
    data: {
      id: user.id,
      name: user.login,
      avatarUrl: user.avatar,
      points: score,
    },
    ratingFieldName: leaderboardConstants.ratingFieldName,
    teamName: leaderboardConstants.TEAM_NAME,
  }
  return body
}

export default getLeaderboarBody
