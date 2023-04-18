import { useEffect } from 'react'
import AudioAPI from '../webAPI/webAudioAPI'

const useAudio = (audioRef: React.RefObject<HTMLMediaElement>, audioAPI: AudioAPI) => {
  const onkeydown = (event: KeyboardEvent) => {
    if (event.code == 'Space') {
      audioAPI.play()
    }
  }

  const onkeyup = (event: KeyboardEvent) => {
    if (event.code == 'Space') {
      audioAPI.pause()
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioAPI.init(audioRef.current)
    }

    window.addEventListener('keydown', onkeydown)
    window.addEventListener('keyup', onkeyup)
    return () => {
      window.removeEventListener('keydown', onkeydown)
      window.removeEventListener('keyup', onkeyup)
    }
  }, [])
}

export default useAudio
