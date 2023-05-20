import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/AuthSlice'
import themeSlice from './theme/ThemeSlice'
import gameSlice from './game/GameSlice'
import leaderboardSlice from './leaderboard/LeaderboardSlice'
import forumSlice from './forum/ForumSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  game: gameSlice,
  leaderboard: leaderboardSlice,
  forum: forumSlice,
})
export type RootState = ReturnType<typeof rootReducer>
