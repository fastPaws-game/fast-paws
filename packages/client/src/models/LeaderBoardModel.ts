export type TPlayerItemType = {
  id: number | undefined
  name: string | undefined
  points: number
  rating?: number
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
