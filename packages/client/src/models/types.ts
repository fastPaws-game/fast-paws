import { TUser } from "./UserModel"

export type TAppState = {
  user: TUser | null
  chats: TChat[] | null
  messages: TMessage[]
  active_chat: ChatToken
  search_users: TUser[]
  known_users: TUser[]
  // tokens: ChatToken[];
  // appIsInited: boolean;
  // isLoading: boolean;
  // isChatsLoaded: boolean;
  // isChatsLoading: boolean;
}

export type APIError = {
  reason: string
  status?: number
  data?: undefined
}

export type Token = {
  token: string
}

export type TChatInfo = {
  id: number
  title: string
  avatar: string | null
  created_by: number
  unread_count: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
    isMine?: boolean
  } | null
}

export type TChatUsers = {
  users: number[]
  chatId: number
}

export type Tid = {
  id: number
}

export type TChat = {
  title: string
}

export type TNewMessage = {
  id: string
  time: string
  user_id: string
  content: string
  type: string
}

export type TMessage = {
  id: number
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  is_read: boolean
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

export type TSendMessage = {
  content: string
  type: string
}

export type TLogin = {
  login: string
}

export type ChatToken = {
  chatId: number
  token: string | undefined
  socket: WebSocket
}

export type TDeletedChat = {
  userId: number
  result: {
    id: number
    title: string
    avatar: string
  }
}

