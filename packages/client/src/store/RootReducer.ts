import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/AuthSlice'
import themeSlice from './theme/ThemeSlice'
import gameSlice from './game/GameSlice'
import leaderboardSlice from './leaderboard/LeaderboardSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  game: gameSlice,
  leaderboard: leaderboardSlice,
})
