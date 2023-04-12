import React from 'react'
import GameLayout from '../layouts/GameLayout'
import ActionLayer from '../layers/ActionLayer'
import LandscapeLayer from '../layers/LandscapeLayer'
import AudioLayer from '../layers/AudioLayer'

const GamePage = () => {
  return (
    <GameLayout>
      <AudioLayer />
      <LandscapeLayer />
      <ActionLayer />
    </GameLayout>
  )
}

export default GamePage
