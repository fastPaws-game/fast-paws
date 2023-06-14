import { useState } from 'react'
import { TAudio, AudioVolume } from '../constants/game'
import Resource from '../engine/ResourceLoader'
import { getValue } from '../utils/data_utils'
import { useAppSelector } from './store'
import { SettingsSelectors } from '../store/settings/SettingsSelectors'
import { setAudio as setAudioEnabled } from '../store/settings/SettingsSlice'
import { useAppDispatch } from './store'

// Can play music and sounds using playAudio(name)
// name must have 'music/sound.audio_name' format
// and have corresponding Audio objects in ResourceLoader
// Optional parameter audioStatusCallback
// uses to send back information about audioEnabled state
export const useAudio = (audioStatusCallback?: (enabled: boolean) => void) => {
  const volume = {
    music: useAppSelector(SettingsSelectors.getMusicVolume),
    sound: useAppSelector(SettingsSelectors.getSoungVolume),
  }
  const dispatch = useAppDispatch()
  const resource = Resource.get()
  const [audioList, setAudioList] = useState<Record<string, HTMLAudioElement>>({})
  let audioEnabled = useAppSelector(SettingsSelectors.getAudioEnabled)
  let activeMusic: string | null = null

  const createAudio = (name: string) => {
    const audioType = name.split('.')[0] as TAudio
    if (Object.keys(AudioVolume).includes(audioType)) {
      const audio = getValue(resource.audio, name) as HTMLAudioElement
      audio.muted = false
      audio.volume = (volume[audioType] || AudioVolume[audioType]) / 10
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
    audioEnabled = state
    dispatch(setAudioEnabled(state)) // TODO: Need to be changed to changeAudio (api in not ready yet)
  }

  const play = (name: string) => {
    if (!Object.keys(audioList).length || !audioList[name]) return
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
    const audioType = name.split('.')[0]
    if (audioType === 'music') {
      activeMusic = name
    }

    if (!audioEnabled) return
    if (!audioList[name]) createAudio(name)
    play(name)
  }

  const switchAudio = (state: boolean) => {
    changeStatus(state)

    if (activeMusic) {
      if (state) playAudio(activeMusic)
      else audioList[activeMusic]?.pause()
    }
  }

  const stopAudio = () => {
    for (const audio in audioList) {
      audioList[audio].pause()
      audioList[audio].currentTime = 0
    }
    activeMusic = null
  }

  return {
    createAudio,
    playAudio,
    stopAudio,
    switchAudio,
    audioEnabled,
  }
}
