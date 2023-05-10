export type TPlayerItemType = {
  id?: number
  name?: string
  points: number
  avatarUrl?: string | null
}

export type LiderboardItem = {
  data: TPlayerItemType
}

export type TLeaderboardAddUser = {
  data: TPlayerItemType
  ratingFieldName: string
  teamName: string
}

export type TLeaderboardRequest = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type TLeaderBoardRequestError = {
  reason: string
}
