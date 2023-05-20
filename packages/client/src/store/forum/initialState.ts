import { ForumSlice } from './types'

export const initialState: ForumSlice = {
  forums: [],
  currentForum: null,

  forumsStatus: 'initial',
  forumsError: null,

  currentForumStatus: 'initial',
  currentForumError: 'null',
}
