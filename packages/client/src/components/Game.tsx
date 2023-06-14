import { FC, useCallback, useState, useEffect } from 'react'
import ActionLayer from './layers/ActionLayer'
import InterfaceLayer from './layers/InterfaceLayer'
import BackgroundLayer from './layers/BackgroundLayer'
import GamePause from './GamePause'
import GameOver from '../components/GameOver'
import Engine from '../engine/Engine'

import getLeaderboardBody from '../utils/getLeaderboardBody'
import { addUserToLeaderboard } from '../store/leaderboard/LeaderboardActions'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'
import { saveCatched, saveScore } from '../store/game/GameSlice'
import { TCatched } from '../engine/@engine'
import { GameSelectors } from '../store/game/GameSelectors'
import { SettingsSelectors } from '../store/settings/SettingsSelectors'
import { useAudio } from '../hooks/useAudio'
import { changeAudio } from '../store/settings/SettingsActions'

type Props = {
  fullScreen: boolean
  switchFullScreen: () => void
}

const GamePage: FC<Props> = props => {
  const audioEnabled = useAppSelector(SettingsSelectors.getAudioEnabled)
  const musicVolume = useAppSelector(SettingsSelectors.getMusicVolume)
  const soundVolume = useAppSelector(SettingsSelectors.getSoungVolume)

  const [pauseVisible, setPauseVisible] = useState(false)
  const [gameOverVisible, setGameOverVisible] = useState(false)
  const [sound, setSound] = useState(audioEnabled)
  const [combo, setCombo] = useState(1)
  const [tooltip, setTooltip] = useState('')

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(authSelectors.getIsAuth)
  const user = useAppSelector(authSelectors.getUser)
  const score = useAppSelector(GameSelectors.getScore)
  const { playAudio, switchAudio, stopAudio } = useAudio(
    {
      music: musicVolume,
      sound: soundVolume,
    },
    (state: boolean) => setSound(state)
  )

  useEffect(() => {
    playAudio('music.mountains')
    return () => stopAudio()
  }, [])

  const audioSwitch = useCallback(
    (state: boolean) => {
      switchAudio(state) // Web api
      // dispatch(changeAudio(state))	// Settings api (not ready yet)
    },
    [dispatch]
  )

  const updateScore = useCallback(
    (score: number) => {
      dispatch(saveScore(score))
    },
    [dispatch]
  )

  const updateCatched = useCallback(
    (id: keyof TCatched) => {
      dispatch(saveCatched(id))
    },
    [dispatch]
  )

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

  const handleCloseGame = useCallback(() => {
    if (!isAuth || !user) return
    const leaderBoardUpdate = getLeaderboardBody(user, score)
    dispatch(addUserToLeaderboard(leaderBoardUpdate))
  }, [score])

  const actionLayerProps = {
    setPauseVisible,
    handleGameOver,
    setCombo,
    setTooltip,
    updateScore,
    updateCatched,
    playAudio,
  }

  const interfaceLayerProps = {
    sound,
    combo,
    tooltip,
    fullScreen: props.fullScreen,
    switchFullScreen: props.switchFullScreen,
    handlePause,
    audioSwitch,
  }

  return (
    <>
      <GamePause
        visible={pauseVisible}
        handleClose={handleCloseGame}
        handleContinue={handleContinue}
        outSideClickEnable
      />
      <GameOver visible={gameOverVisible} handleClose={handleNewGame} />
      <BackgroundLayer />
      <ActionLayer handlers={actionLayerProps} />
      <InterfaceLayer {...interfaceLayerProps} />
    </>
  )
}

export default GamePage
