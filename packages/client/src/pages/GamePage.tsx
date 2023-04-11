import { useState, createContext } from 'react';
import GameLayout from '../layouts/GameLayout'
import ActionLayer from '../layers/ActionLayer'
import LandscapeLayer from '../layers/LandscapeLayer'
import GamePause from '../components/gamePause'
import GameOver from '../components/GameOver'
import Engine from '../engine/Engine';

const GameContext = createContext({});

const GamePage = () => {
	const [pauseVisible, setPauseVisible] = useState(false);
	const [gameOverVisible, setGameOverVisible] = useState(false);

	function handlePause(){
		setPauseVisible(true)
	}
	
	function handleContinue(){
		setPauseVisible(false)
		const engine = Engine.get()
		engine.pause(false)
	}

	function handleGameOver(){
		setGameOverVisible(true)
	}
	
	function handleNewGame(){
		setGameOverVisible(false)
		const engine = Engine.get()
		engine.start()
	}

	return (
		<GameLayout>
			<GamePause visible={pauseVisible} handleClose={handleContinue} outSideClickEnable/>
			<GameOver visible={gameOverVisible} handleClose={handleNewGame} />
			<LandscapeLayer />
			<ActionLayer {...{handlePause, handleGameOver}}/>
		</GameLayout>
  )
}

// handleContinue={handleContinue}

export default GamePage
