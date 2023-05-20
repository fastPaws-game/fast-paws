import FetchApi from '../utils/fetchApi'
import { TLeaderboardAddUser, TLeaderboardRequest } from '../models/LeaderBoardModel'

class LeaderboardApi {
  public addUserToLeaderboard(body: TLeaderboardAddUser) {
    return FetchApi.post('/leaderboard', { body })
  }

  public getTeamLeaderboard(body: TLeaderboardRequest, teamName: string) {
    return FetchApi.post(`/leaderboard/${teamName}`, { body })
  }

  public getAllLeaderboard(body: TLeaderboardRequest) {
    return FetchApi.post('/leaderboard/all', { body })
  }
}

export default new LeaderboardApi()
