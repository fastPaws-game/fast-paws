export default class AudioAPI {
  private static _instance: AudioAPI
  private _audioContext!: AudioContext
  private _audioRef!: HTMLMediaElement
  private _source!: MediaElementAudioSourceNode | null
  private _gainNode!: GainNode | null

  constructor() {
    if (AudioAPI._instance) {
      return AudioAPI._instance
    }

    this._audioContext = new AudioContext()
    this._source = null
    this._gainNode = null
    AudioAPI._instance = this
  }

  public init(audioRef: HTMLMediaElement) {
    if (this._source == null) {
      this._audioRef = audioRef
      this._source = this._audioContext.createMediaElementSource(audioRef)
      this._gainNode = this._audioContext.createGain()
      this._source
        .connect(this._gainNode)
        .connect(this._audioContext.destination)
    }
  }

  public play() {
    if (this._audioContext.state === 'suspended') {
      this._audioContext.resume()
    }
    if (this._gainNode !== null) {
      this._gainNode.gain.value = 1
    }
    this._audioRef.play()
  }

  public pause() {
    if (this._gainNode !== null) {
      this._gainNode.gain.linearRampToValueAtTime(
        0.001,
        this._audioContext.currentTime + 1
      )
    }
  }
}
