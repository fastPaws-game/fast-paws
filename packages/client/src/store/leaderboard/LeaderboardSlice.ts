import { createSlice } from '@reduxjs/toolkit'
import { LiderboardItem } from '../../models/LeaderBoardModel'
import { handleError } from '../../utils/handleError'
import { addUserToLiderboard, getTeamLiderboard, getAllLeadearboard } from './LiaderboardActions'
import { RequestStatus } from '../types'

type Tleaderboard = {
  liderboardItems: Array<LiderboardItem>

  addUserToLiderboardStatus: RequestStatus
  addUserToLiderboardError: string | null

  getTeamStatus: RequestStatus
  getTeamError: string | null

  getAllStatus: RequestStatus
  getAllError: string | null
}

const initialState: Tleaderboard = {
  liderboardItems: [],

  addUserToLiderboardStatus: 'initial',
  addUserToLiderboardError: null,

  getTeamStatus: 'initial',
  getTeamError: null,

  getAllStatus: 'initial',
  getAllError: null,
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

      //GetAllLeaderboard
      .addCase(getAllLeadearboard.pending, state => {
        state.getAllStatus = 'pending'
      })
      .addCase(getAllLeadearboard.fulfilled, state => {
        state.getAllStatus = 'success'
        state.getAllError = 'error'
      })
      .addCase(getAllLeadearboard.rejected, (state, action) => {
        state.getAllStatus = 'error'
        state.getAllError = handleError(action.payload)
      })
  },
})

export default leaderboardSlice.reducer
