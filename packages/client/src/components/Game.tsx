import { FC, useState, useCallback, useEffect, useRef } from 'react'
import ActionLayer from './layers/ActionLayer'
import InterfaceLayer from './layers/InterfaceLayer'
import BackgroundLayer from './layers/BackgroundLayer'
import GamePause from './GamePause'
import GameOver from '../components/GameOver'
import Engine from '../engine/Engine'

import getLeaderboarBody from '../utils/getLeaderboardBody'
import { addUserToLiderboard } from '../store/leaderboard/LiaderboardActions'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'

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

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(authSelectors.getIsAuth)
  const user = useAppSelector(authSelectors.getUser)
  const newPoints = useRef(score)
  newPoints.current = score

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

  const actionLayerProps = { setPauseVisible, handleGameOver, setLevel, setScore, setCombo, setTooltip, setCatched }

  const interfaceLayerProps = {
    level,
    score,
    combo,
    tooltip,
    catched,
    fullScreen: props.fullScreen,
    switchFullScreen: props.switchFullScreen,
    handlePause,
  }

  useEffect(() => {
    return () => {
      if (user && isAuth) {
        dispatch(addUserToLiderboard(getLeaderboarBody(user, newPoints.current)))
      }
    }
  }, [])

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
