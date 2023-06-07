import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/AuthSlice'
import themeSlice from './theme/ThemeSlice'
import gameSlice from './game/GameSlice'
import leaderboardSlice from './leaderboard/LeaderboardSlice'
import forumSlice from './forum/ForumSlice'
import topicSlice from './topic/TopicSlice'
import commentsSlice from './comments/CommentsSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  game: gameSlice,
  leaderboard: leaderboardSlice,
  forum: forumSlice,
  topic: topicSlice,
  comments: commentsSlice,
})
export type RootState = ReturnType<typeof rootReducer>
