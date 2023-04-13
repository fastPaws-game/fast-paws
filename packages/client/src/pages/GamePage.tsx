import GameLayout from '../layouts/GameLayout'
import ActionLayer from '../layers/ActionLayer'
import BackgroundLayer from '../layers/BackgroundLayer'

const GamePage = () => {
  return (
    <GameLayout>
      <BackgroundLayer />
      <ActionLayer />
    </GameLayout>
  )
}

export default GamePage
