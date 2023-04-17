import { useState, useEffect } from 'react'
import LoadingPage from '../components/LoadingScreen'
import Resource from '../engine/ResourceLoader'
import DeviceSelector from '../components/DeviceSelector'

const LoaderGame = () => {
  const [progress, setProgress] = useState(0)

	const progressCallback = (current: number) => {
		// console.log(`Resource loading: ${current}%`)
		setProgress(current)
	}

	useEffect(() => {
    const resource=Resource.get(progressCallback)
		setProgress(resource.progress)
  }, [progress]);

  return (progress < 100 ? <LoadingPage progress = {progress}/> : <DeviceSelector />)
}

export default LoaderGame
