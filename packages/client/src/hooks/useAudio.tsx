import { useState } from 'react'
import { AudioVolume } from '../constants/game'
import Resource from '../engine/ResourceLoader'
import { getValue } from '../utils/data_utils'

type TAudio = 'sound' | 'music'

export const useAudio = () => {
  const resource = Resource.get()
  const [audioList, setAudioList] = useState<Record<string, HTMLAudioElement>>({})
  const [activeMusic, setActiveMusic] = useState<string | null>(null)
  const [isOn, setIsOn] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const createAudio = (name: string) => {
    const AudioType = name.split('.')[0] as TAudio
    const types: TAudio[] = ['sound', 'music']
    if (types.includes(AudioType)) {
      const audio = getValue(resource.audio, name) as HTMLAudioElement
      audio.muted = isMuted
      audio.volume = AudioVolume[AudioType] / 10
      audio.loop = AudioType === 'music'

      const list = audioList
      list[name] = audio
      setAudioList(list)
    } else {
      console.log('Wrong audio name:', name)
    }
  }

  const play = (name: string) => {
    if (!Object.keys(audioList).length || !audioList[name]) return
    audioList[name].play().catch((e: Error) => {
      console.warn(e.message)
    })

    const AudioType = name.split('.')[0] as TAudio
    if (AudioType === 'music') {
      setActiveMusic(name)
    }
  }

  const mute = (mute: boolean) => {
    for (const audio in audioList) {
      audioList[audio].muted = mute
    }
  }

  const playAudio = (name: string) => {
    if (!Object.keys(audioList).length || !audioList[name]) return
    if (isMuted) return
    play(name)
  }

  const toggleAudio = (name: string) => {
    if (!Object.keys(audioList).length || !audioList[name]) return
    if (!isOn) play(name)
    else audioList[name].pause()

    setIsMuted(!isMuted)
    setIsOn(!isOn)
    mute(!isMuted)
  }

  const switchAudio = (state: boolean) => {
    if (!Object.keys(audioList).length) return
    if (activeMusic) {
      if (state) play(activeMusic)
      else audioList[activeMusic].pause()
    }

    setIsMuted(state)
    setIsOn(state)
    mute(state)
  }

  const stopAudio = () => {
    for (const audio in audioList) {
      audioList[audio].pause()
      audioList[audio].currentTime = 0
    }
    setIsOn(false)
    setActiveMusic(null)
    // setAudioList({})
  }

  return {
    createAudio,
    playAudio,
    stopAudio,
    toggleAudio,
    switchAudio,
    isOn,
  }
}
