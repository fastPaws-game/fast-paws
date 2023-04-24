import React, { FC, forwardRef, useRef } from 'react'
import AudioAPI from '../../webAPI/webAudioAPI'
import useAudio from '../../hooks/useAudio'
import audio from '../assets/audio/animals-cat-blue-meow.mp3'
import styled from 'styled-components'

const AudioLayer: FC = forwardRef(() => {
  const audioRef = useRef<HTMLMediaElement>(null)
  const audioAPI = new AudioAPI()

  useAudio(audioRef, audioAPI)

  return <Audio src={audio} ref={audioRef} />
})

const Audio = styled.audio`
  position: absolute;
  z-index: 100;
`

export default AudioLayer
