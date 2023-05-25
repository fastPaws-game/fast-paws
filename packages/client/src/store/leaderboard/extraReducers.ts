import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { addUserToLeaderboard, getTeamLeaderboard } from './LeaderboardActions'
import { handleError } from '../../utils/handleError'
import { LeaderboardSlice } from './LeaderboardSlice'

export const buildTeamLeaderboard = (builder: ActionReducerMapBuilder<LeaderboardSlice>) =>
  builder
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

export const buildAddUserToLeaderboard = (builder: ActionReducerMapBuilder<LeaderboardSlice>) =>
  builder
    .addCase(addUserToLeaderboard.pending, state => {
      state.addUserToLeaderboardStatus = 'pending'
    })
    .addCase(addUserToLeaderboard.fulfilled, state => {
      state.addUserToLeaderboardStatus = 'success'
    })
    .addCase(addUserToLeaderboard.rejected, state => {
      state.addUserToLeaderboardStatus = 'error'
    })
