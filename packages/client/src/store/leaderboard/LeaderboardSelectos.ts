import { RootState } from '../index'

const getLeaderbordItems = (state: RootState) => state.leaderboard.liderboardItems

export const leaderboardSelectors = { getLeaderbordItems }
