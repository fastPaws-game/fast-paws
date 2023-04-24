import { FC, useState, useMemo, useCallback } from 'react'
import ActionLayer from '../layers/ActionLayer'
import InterfaceLayer from '../layers/InterfaceLayer'
import BackgroundLayer from '../layers/BackgroundLayer'
import GamePause from './GamePause'
import GameOver from '../components/GameOver'
import Engine from '../engine/Engine'

type Props = {
  fullScreen: boolean
  switchFullScreen: () => void
}
const GamePage: FC<Props> = props => {
  const [pauseVisible, setPauseVisible] = useState(false)
  const [gameOverVisible, setGameOverVisible] = useState(false)
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [tooltip, setTooltip] = useState('')
  const [catched, setCatched] = useState({ mouse: 0, grasshopper: 0, butterfly: 0, bird: 0 })

  const handlePause = useCallback(() => {
    const engine = Engine.get()
    engine.pause(true)
  }, [])

  const handleContinue = useCallback(() => {
    setPauseVisible(false)
    const engine = Engine.get()
    engine.pause(false)
  }, [setPauseVisible])

  const handleGameOver = useCallback(() => {
    setGameOverVisible(true)
  }, [setGameOverVisible])

  const handleNewGame = useCallback(() => {
    setGameOverVisible(false)
    const engine = Engine.get()
    engine.start()
  }, [setGameOverVisible])

  const actionLayerProps = useMemo(
    () => ({ setPauseVisible, handleGameOver, setLevel, setScore, setCombo, setTooltip, setCatched }),
    [setPauseVisible, handleGameOver, setLevel, setScore, setCombo, setTooltip, setCatched]
  )

  const interfaceLayerProps = useMemo(
    () => ({
      level,
      score,
      combo,
      tooltip,
      catched,
      fullScreen: props.fullScreen,
      switchFullScreen: props.switchFullScreen,
      handlePause,
    }),
    [level, score, tooltip, catched, combo, props.fullScreen, props.switchFullScreen, handlePause]
  )

  return (
    <>
      <GamePause visible={pauseVisible} handleClose={handleContinue} outSideClickEnable />
      <GameOver visible={gameOverVisible} handleClose={handleNewGame} />
      <BackgroundLayer />
      <ActionLayer {...actionLayerProps} />
      <InterfaceLayer {...interfaceLayerProps} />
    </>
  )
}

export default GamePage
