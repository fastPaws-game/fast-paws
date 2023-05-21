export type TPlayerItem = {
  id?: number
  name?: string
  points: number
  avatarUrl?: string | null
}

export type TLeaderboardItem = {
  data: TPlayerItem
}

export type TLeaderboardAddUser = {
  data: TPlayerItem
  ratingFieldName: string
  teamName: string
}

export type TLeaderboardRequest = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type TLeaderboardRequestError = {
  reason: string
}
