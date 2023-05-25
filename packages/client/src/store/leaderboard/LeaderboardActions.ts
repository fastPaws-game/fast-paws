import { createAsyncThunk } from '@reduxjs/toolkit'
import LeaderboardApi from '../../api/LeaderboardApi'
import { TLeaderboardAddUser, TLeaderboardRequest } from '../../models/LeaderBoardModel'
import { LEADERBOARD_CONSTS } from '../../constants/leaderBoard'

export const addUserToLeaderboard = createAsyncThunk(
  'leaderboard/addUserToLeaderboard',
  async (body: TLeaderboardAddUser, { rejectWithValue }) => {
    try {
      await LeaderboardApi.addUserToLeaderboard(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getTeamLeaderboard = createAsyncThunk(
  'leaderboard/getTeamLeaderboard',
  async (body: TLeaderboardRequest, { rejectWithValue }) => {
    try {
      return await LeaderboardApi.getTeamLeaderboard(body, LEADERBOARD_CONSTS.teamName)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
