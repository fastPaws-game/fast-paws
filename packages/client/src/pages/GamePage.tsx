import { useState, createContext } from 'react'
import GameLayout from '../layouts/GameLayout'
import ActionLayer from '../layers/ActionLayer'
// import LandscapeLayer from '../layers/LandscapeLayer'
import BackgroundLayer from '../layers/BackgroundLayer'
import GamePause from '../components/gamePause'
import GameOver from '../components/GameOver'
import Engine from '../engine/Engine'

const GameContext = createContext({})

const GamePage = () => {
  const [pauseVisible, setPauseVisible] = useState(false)
  const [gameOverVisible, setGameOverVisible] = useState(false)

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
      <ActionLayer {...{ handlePause, handleGameOver }} />
    </GameLayout>
  )
}

export default GamePage
