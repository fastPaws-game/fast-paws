import { createAsyncThunk } from '@reduxjs/toolkit'
import LeaderboardApi from '../../api/LeaderboardApi'
import { TLeaderboardRequest, TLeaderboardAddUser } from '../../models/LeaderBoardModel'
import { LEADERBOARD_CONSTS } from '../../constants/leaderBoard'
import { TLeaderboardItem, TLeaderboardRequestError } from '../../models/LeaderBoardModel'

export const addUserToLeaderboard = createAsyncThunk(
  'leaderboard/addUserToLeaderboard',
  async (body: TLeaderboardAddUser, { rejectWithValue }) => {
    try {
      const response = await LeaderboardApi.addUserToLeaderboard(body)

      if (response.status !== 200) {
        const error: TLeaderboardRequestError = await response.json()
        return rejectWithValue(error)
      }
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getTeamLeaderboard = createAsyncThunk(
  'leaderboard/getTeamLeaderboard',
  async (body: TLeaderboardRequest, { rejectWithValue }) => {
    try {
      const response = await LeaderboardApi.getTeamLeaderboard(body, LEADERBOARD_CONSTS.teamName)

      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.reason)
      }

      const result: Array<TLeaderboardItem> = await response.json()
      return result
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
