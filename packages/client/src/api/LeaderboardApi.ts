import FetchApi from '../utils/fetchApi'
import { TLeaderboardAddUser, TLeaderboardRequest } from '../models/LeaderBoardModel'

class LeaderboardApi {
  public addUserToLeaderboard(data: TLeaderboardAddUser) {
    return FetchApi.post('/leaderboard', { body: data })
  }

  public getTeamLeaderboard(data: TLeaderboardRequest, teamName: string) {
    return FetchApi.post(`/leaderboard/${teamName}`, { body: data })
  }

  public getAllLeaderboard(data: TLeaderboardRequest) {
    return FetchApi.post('/leaderboard/all', { body: data })
  }
}

export default new LeaderboardApi()
