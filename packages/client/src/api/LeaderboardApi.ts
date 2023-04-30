import FetchApi from '../utils/fetchApi'
import { TLeaderboardAddUser, TLeaderboardRequest } from '../models/LeaderBoardModel'

class LeaderboardApi {
  public addUserToLeaderboard(data: TLeaderboardAddUser) {
    return FetchApi.post('/leaderboard', { body: JSON.stringify(data) })
  }

  public getTeamLeaderboard(data: TLeaderboardRequest, teamName: string) {
    return FetchApi.post(`/leaderboard/${teamName}`, { body: JSON.stringify(data) })
  }

  public getAllLeaderboard(data: TLeaderboardRequest) {
    return FetchApi.post('/leaderboard/all', { body: JSON.stringify(data) })
  }
}

export default new LeaderboardApi()
