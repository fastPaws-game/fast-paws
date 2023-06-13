import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/AuthSlice'
import settingsSlice from './settings/SettingsSlice'
import gameSlice from './game/GameSlice'
import leaderboardSlice from './leaderboard/LeaderboardSlice'
import forumSlice from './forum/ForumSlice'
import topicSlice from './topic/TopicSlice'
import commentsSlice from './comments/CommentsSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  settings: settingsSlice,
  game: gameSlice,
  leaderboard: leaderboardSlice,
  forum: forumSlice,
  topic: topicSlice,
  comments: commentsSlice,
})
export type RootState = ReturnType<typeof rootReducer>
