import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GAME } from '../../constants/game'
import LocalStorage from '../../utils/localStorage'

type GameSlice = {
  score: number
  catched: {
    mouse: number
    grasshopper: number
    frog: number
    butterfly: number
    bird: number
  }
}

const score = LocalStorage.get('score') || GAME.initialScore
const catched = LocalStorage.get('catched') || {
  mouse: 0,
  grasshopper: 0,
  frog: 0,
  butterfly: 0,
  bird: 0,
}

const initialState: GameSlice = {
  score,
  catched,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    saveScore: (state, action: PayloadAction<GameSlice['score']>) => {
      state.score = action.payload
      LocalStorage.set('score', action.payload)
    },
    saveCatched: (state, action: PayloadAction<GameSlice['catched']>) => {
      state.catched = action.payload
      LocalStorage.set('catched', action.payload)
    },
  },
})

export const { saveScore, saveCatched } = gameSlice.actions

export default gameSlice.reducer
