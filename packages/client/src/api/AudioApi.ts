import { fetchApiV1 } from '../utils/fetchApi'
import { TAudioStatus } from '../store/theme/AudioSlice'

class AudioApi {
  public get() {
    return fetchApiV1.get<TAudioStatus>('/audio')
  }

  public put(audio: TAudioStatus) {
    return fetchApiV1.put<TAudioStatus>('/audio', {
      body: {
        audio,
      },
    })
  }
}

export default new AudioApi()
