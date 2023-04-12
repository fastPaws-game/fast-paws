import GameLayout from '../layouts/GameLayout'
import ActionLayer from '../layers/ActionLayer'
import GroundLayer from '../layers/GroundLayer'
import SkyLayer from '../layers/SkyLayer'
import MountainLayer from '../layers/MountainLayer'

const GamePage = () => {
  return (
    <GameLayout>
      <SkyLayer />
      <MountainLayer />
      {/* <GroundLayer /> */}
      <ActionLayer />
    </GameLayout>
  )
}

export default GamePage
