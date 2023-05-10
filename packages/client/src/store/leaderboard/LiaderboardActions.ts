import { createAsyncThunk } from '@reduxjs/toolkit'
import LeaderboardApi from '../../api/LeaderboardApi'
import { TLeaderboardRequest, TLeaderboardAddUser } from '../../models/LeaderBoardModel'
import { LEADERBOARD_CONSTS } from '../../constants/leaderBoard'
import { LiderboardItem, TLeaderBoardRequestError } from '../../models/LeaderBoardModel'

export const addUserToLiderboard = createAsyncThunk(
  'leaderboard/addUserToLiderboard',
  async (body: TLeaderboardAddUser, { rejectWithValue }) => {
    try {
      const response = await LeaderboardApi.addUserToLeaderboard(body)

      if (response.status !== 200) {
        const error: TLeaderBoardRequestError = await response.json()
        return rejectWithValue(error)
      }

      return
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getTeamLiderboard = createAsyncThunk(
  'leaderboard/getTeamLiderboard',
  async (body: TLeaderboardRequest, { rejectWithValue }) => {
    try {
      const response = await LeaderboardApi.getTeamLeaderboard(body, LEADERBOARD_CONSTS.teamName)

      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.reason)
      }

      const result: Array<LiderboardItem> = await response.json()
      return result
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
