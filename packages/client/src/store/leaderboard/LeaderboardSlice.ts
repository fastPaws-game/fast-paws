import { createSlice } from '@reduxjs/toolkit'
import { TLeaderboardItem } from '../../models/LeaderBoardModel'
import { RequestStatus } from '../types'
import { buildAddUserToLeaderboard, buildTeamLeaderboard } from './ExtraReducers'

export type LeaderboardSlice = {
  leaderboardItems: Array<TLeaderboardItem> | undefined

  addUserToLeaderboardStatus: RequestStatus
  addUserToLeaderboardError: string | null

  getTeamStatus: RequestStatus
  getTeamError: string | null
}

const initialState: LeaderboardSlice = {
  leaderboardItems: [],

  addUserToLeaderboardStatus: 'initial',
  addUserToLeaderboardError: null,

  getTeamStatus: 'initial',
  getTeamError: null,
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    buildAddUserToLeaderboard(builder)
    buildTeamLeaderboard(builder)
  },
})

export default leaderboardSlice.reducer
