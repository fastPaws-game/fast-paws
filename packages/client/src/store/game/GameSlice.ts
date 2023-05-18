import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GAME } from '../../constants/game'
import LocalStorage from '../../utils/localStorage'
import { TCatched } from '../../engine/@engine'

type GameSlice = {
  score: number
  catched: TCatched
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
    },
    saveCatched: (state, action: PayloadAction<keyof TCatched>) => {
      const id = action.payload
      state.catched[id] += 1
    },
  },
})

export const { saveScore, saveCatched } = gameSlice.actions

export default gameSlice.reducer
