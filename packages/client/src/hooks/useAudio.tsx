import { useState } from 'react'
import { TAudio, AudioVolume } from '../constants/game'
import Resource from '../engine/ResourceLoader'
import { getValue } from '../utils/data_utils'

// Can play music and sounds using playAudio(name)
// name must have 'music/sound.audio_name' format
// and have corresponding Audio objects in ResourceLoader
// Optional parameters:
// volume={music: number, sound: number}
// audioStatusCallback uses to receive information about Audio enabled/disabled state
export const useAudio = (volume?: Record<TAudio, number>, audioStatusCallback?: (enabled: boolean) => void) => {
  const resource = Resource.get()
  const [audioList, setAudioList] = useState<Record<string, HTMLAudioElement>>({})
  let activeMusic: string | null = null
  let enabled = true

  const createAudio = (name: string) => {
    const audioType = name.split('.')[0] as TAudio
    if (Object.keys(AudioVolume).includes(audioType)) {
      const audio = getValue(resource.audio, name) as HTMLAudioElement
      audio.muted = false
      audio.volume = (volume ? volume[audioType] : AudioVolume[audioType]) / 10
      audio.loop = audioType === 'music'

      const list = audioList
      list[name] = audio
      setAudioList(list)
    } else {
      console.warn('Wrong audio name:', name)
    }
  }

  const changeStatus = (state: boolean) => {
    if (audioStatusCallback) audioStatusCallback(state)
    enabled = state
  }

  const play = (name: string) => {
    if (!Object.keys(audioList).length || !audioList[name]) return

    const audioType = name.split('.')[0]
    if (audioType === 'music') {
      activeMusic = name
    }

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
    enabled = false
    activeMusic = null
  }

  return {
    createAudio,
    playAudio,
    stopAudio,
    switchAudio,
  }
}
