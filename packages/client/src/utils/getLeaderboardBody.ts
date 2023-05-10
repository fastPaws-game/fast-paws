import { LEADERBOARD_CONSTS } from '../constants/leaderBoard'
import { TUser } from '../models/UserModel'

const getLeaderboarBody = (user: TUser, score: number) => {
  const body = {
    data: {
      id: user.id,
      name: user.login,
      avatarUrl: user.avatar,
      points: score,
    },
    ratingFieldName: LEADERBOARD_CONSTS.ratingFieldName,
    teamName: LEADERBOARD_CONSTS.teamName,
  }
  return body
}

export default getLeaderboarBody
