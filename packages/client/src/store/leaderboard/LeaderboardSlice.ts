import { createSlice } from '@reduxjs/toolkit'
import { TLeaderboardItem } from '../../models/LeaderBoardModel'
import { handleError } from '../../utils/handleError'
import { addUserToLeaderboard, getTeamLeaderboard } from './LeaderboardActions'
import { RequestStatus } from '../types'

export type TLeaderboard = {
  leaderboardItems: Array<TLeaderboardItem> | undefined

  addUserToLeaderboardStatus: RequestStatus
  addUserToLeaderboardError: string | null

  getTeamStatus: RequestStatus
  getTeamError: string | null
}

const initialState: TLeaderboard = {
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
    builder
      //AddUserToLeaderboard
      .addCase(addUserToLeaderboard.pending, state => {
        state.addUserToLeaderboardStatus = 'pending'
      })
      .addCase(addUserToLeaderboard.fulfilled, state => {
        state.addUserToLeaderboardStatus = 'success'
      })
      .addCase(addUserToLeaderboard.rejected, state => {
        state.addUserToLeaderboardStatus = 'error'
      })

      //GetLeaderboardByTeamName
      .addCase(getTeamLeaderboard.pending, state => {
        state.getTeamStatus = 'pending'
      })
      .addCase(getTeamLeaderboard.fulfilled, (state, action) => {
        state.getTeamStatus = 'success'
        state.getTeamError = null
        state.leaderboardItems = action.payload
      })
      .addCase(getTeamLeaderboard.rejected, (state, action) => {
        state.getTeamStatus = 'error'
        state.getTeamError = handleError(action.payload)
      })
  },
})

export default leaderboardSlice.reducer
