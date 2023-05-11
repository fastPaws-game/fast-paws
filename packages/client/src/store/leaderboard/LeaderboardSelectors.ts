import { RootState } from '../index'

const getLeaderbordItems = (state: RootState) => state.leaderboard.leaderboardItems

export const leaderboardSelectors = { getLeaderbordItems }
