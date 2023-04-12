import React, { FC, forwardRef, useRef, useEffect } from 'react'
import audio from '../assets/audio/koshachiy-krik.mp3'
import styled from 'styled-components'

const AudioLayer: FC = forwardRef(() => {
  const audioRef: React.MutableRefObject<HTMLMediaElement | null> = useRef(null)
  let audioContext: AudioContext
  let source: MediaElementAudioSourceNode
  let gainNode: GainNode

  const init = () => {
      audioContext = new AudioContext()
      if (audioRef.current) {
        source = audioContext.createMediaElementSource(audioRef.current)
        gainNode = audioContext.createGain();
        source.connect(gainNode).connect(audioContext.destination)
      }
  }
  
  const onkeydown = (event: KeyboardEvent) => {
    if (event.code == 'Space') {
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      if (audioRef.current) {
        gainNode.gain.value = 1
        audioRef.current.play()
      }
    }
  }

  const onkeyup = (event: KeyboardEvent) => {
    if (event.code == 'Space') {
      if (audioRef.current) {
        gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 1.5)
      }
    }
  }

  useEffect(() => {
    if (!audioContext) {
      init()
    }
    window.addEventListener('keydown', onkeydown)
    return () => {
      window.removeEventListener('keydown', onkeydown)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keyup', onkeyup)
    return () => window.removeEventListener('keyup', onkeyup)
  }, [])
  
  return (
      <Audio src={audio} ref={audioRef}>
      </Audio>
    )
})

const Audio = styled.audio`
  position: absolute;
  z-index: 100;
`

export default AudioLayer
