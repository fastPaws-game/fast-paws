import { useState } from 'react'
import { TAudio, AudioVolume } from '../constants/game'
import Resource from '../engine/ResourceLoader'
import { getValue } from '../utils/data_utils'

export const useAudio = (audioStatusCallback?: (enabled: boolean) => void) => {
  const resource = Resource.get()
  const [audioList, setAudioList] = useState<Record<string, HTMLAudioElement>>({})
  // Help!!! Эти хуки просто перестали работать.
  // const [activeMusic, setActiveMusic] = useState<string | null>(null)
  // const [enabled, setEnabled] = useState(true)
  // Переделал на обычные переменные:
  let activeMusic: string | null = null
  let enabled = true

  const createAudio = (name: string) => {
    const AudioType = name.split('.')[0]
    if (Object.keys(AudioVolume).includes(AudioType)) {
      const audio = getValue(resource.audio, name) as HTMLAudioElement
      audio.muted = false
      audio.volume = AudioVolume[AudioType as TAudio] / 10
      audio.loop = AudioType === 'music'

      const list = audioList
      list[name] = audio
      setAudioList(list)
    } else {
      console.log('Wrong audio name:', name)
    }
  }

  const changeStatus = (state: boolean) => {
    if (audioStatusCallback) audioStatusCallback(state)
    // setEnabled(state)
    enabled = state
  }

  const play = (name: string) => {
    if (!Object.keys(audioList).length || !audioList[name]) return

    const AudioType = name.split('.')[0]
    if (AudioType === 'music') {
      // setActiveMusic(name)
      activeMusic = name
      // console.log(`set activeMusic: ${name}, ${activeMusic}`)
    }

    // console.log(`Trying to play: ${name}`)
    audioList[name].play().catch((e: Error) => {
      console.warn(e.message)
      changeStatus(false)
    })
  }

  const mute = (mute: boolean) => {
    for (const audio in audioList) {
      audioList[audio].muted = mute
    }
  }

  const playAudio = (name: string) => {
    if (!enabled) return
    if (!audioList[name]) createAudio(name)
    play(name)
  }

  const switchAudio = (state: boolean) => {
    if (!Object.keys(audioList).length) return
    if (activeMusic) {
      if (state) play(activeMusic)
      else audioList[activeMusic].pause()
    }

    changeStatus(state)
    // mute(!state)
  }

  const stopAudio = () => {
    for (const audio in audioList) {
      audioList[audio].pause()
      audioList[audio].currentTime = 0
    }
    // setEnabled(false)
    enabled = false
    activeMusic = null
    // setActiveMusic(null)
    // setAudioList({})
  }

  return {
    createAudio,
    playAudio,
    stopAudio,
    switchAudio,
  }
}
