import { createSlice } from '@reduxjs/toolkit'
import { LiderboardItem } from '../../models/LeaderBoardModel'
import { handleError } from '../../utils/handleError'
import { addUserToLiderboard, getTeamLiderboard } from './LiaderboardActions'
import { RequestStatus } from '../types'

export type Tleaderboard = {
  liderboardItems: Array<LiderboardItem> | undefined

  addUserToLiderboardStatus: RequestStatus
  addUserToLiderboardError: string | null

  getTeamStatus: RequestStatus
  getTeamError: string | null
}

const initialState: Tleaderboard = {
  liderboardItems: [],

  addUserToLiderboardStatus: 'initial',
  addUserToLiderboardError: null,

  getTeamStatus: 'initial',
  getTeamError: null,
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //AddUserToLiderboard
      .addCase(addUserToLiderboard.pending, state => {
        state.addUserToLiderboardStatus = 'pending'
      })
      .addCase(addUserToLiderboard.fulfilled, state => {
        state.addUserToLiderboardStatus = 'success'
      })
      .addCase(addUserToLiderboard.rejected, state => {
        state.addUserToLiderboardStatus = 'error'
      })

      //GetLeaderboardByTeamName
      .addCase(getTeamLiderboard.pending, state => {
        state.getTeamStatus = 'pending'
      })
      .addCase(getTeamLiderboard.fulfilled, (state, action) => {
        state.getTeamStatus = 'success'
        state.getTeamError = null
        state.liderboardItems = action.payload
      })
      .addCase(getTeamLiderboard.rejected, (state, action) => {
        state.getTeamStatus = 'error'
        state.getTeamError = handleError(action.payload)
      })
  },
})

export default leaderboardSlice.reducer
