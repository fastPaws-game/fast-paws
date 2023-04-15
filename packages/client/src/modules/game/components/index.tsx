import React, { createContext, FC, useState } from 'react'
import Engine from '../../../engine/Engine'
import GameLayout from '../../../layouts/GameLayout'
import GamePause from '../../../components/gamePause'
import GameOver from '../../../components/GameOver'
import BackgroundLayer from '../../../layers/BackgroundLayer'
import ActionLayer from '../../../layers/ActionLayer'
import InterfaceLayer from '../../../layers/InterfaceLayer'

const GameContext = createContext({})
const Game: FC = () => {
  const [pauseVisible, setPauseVisible] = useState(false)
  const [gameOverVisible, setGameOverVisible] = useState(false)
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [tooltip, setTooltip] = useState('')
  const [catched, setCatched] = useState({ mouse: 0, grasshopper: 0, butterfly: 0, bird: 0 })

  const handlePause = () => {
    setPauseVisible(true)
  }

  const handleContinue = () => {
    setPauseVisible(false)

    const engine = Engine.get()
    engine.pause(false)
  }

  const handleGameOver = () => {
    setGameOverVisible(true)
  }

  const handleNewGame = () => {
    setGameOverVisible(false)

    const engine = Engine.get()
    engine.start()
  }

  return (
    <GameLayout>
      <GamePause visible={pauseVisible} handleClose={handleContinue} outSideClickEnable />
      <GameOver visible={gameOverVisible} handleClose={handleNewGame} />
      <BackgroundLayer />
      <ActionLayer {...{ handlePause, handleGameOver, setLevel, setScore, setTooltip, setCatched }} />
      <InterfaceLayer level={level} score={score} tooltip={tooltip} catched={catched} />
    </GameLayout>
  )
}

export default Game
