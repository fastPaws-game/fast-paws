import { createAsyncThunk } from '@reduxjs/toolkit'
import LeaderboardApi from '../../api/LeaderboardApi'
import { TLeaderboardRequest, TLeaderboardAddUser } from '../../models/LeaderBoardModel'
import { leaderboardConstants } from '../../constants/leaderBoard'

export const addUserToLiderboard = createAsyncThunk(
  'leaderboard/addUserToLiderboard',
  async (body: TLeaderboardAddUser, { rejectWithValue }) => {
    try {
      const response = await LeaderboardApi.addUserToLeaderboard(body)

      if (response.status !== 200) {
        const error = await response.json()
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
      const response = await LeaderboardApi.getTeamLeaderboard(body, leaderboardConstants.TEAM_NAME)

      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.reason)
      }

      const result = await response.json()
      return result
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getAllLeadearboard = createAsyncThunk(
  'leaderboard/getAllLeadearboard',
  async (body: TLeaderboardRequest, { rejectWithValue }) => {
    try {
      const response = await LeaderboardApi.getAllLeaderboard(body)

      if (response.status !== 200) {
        const error = await response.json()
        return rejectWithValue(error.response)
      }

      const result = await response.json()
      return result
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
