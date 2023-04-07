import React from 'react'
import GameLayout from '../layouts/GameLayout'
import ActionLayer from '../layers/ActionLayer'
import LandscapeLayer from '../layers/LandscapeLayer'

const GamePage = () => {
  return (
    <GameLayout>
      <LandscapeLayer />
      <ActionLayer />
    </GameLayout>
  )
}

export default GamePage
