import React, { createRef } from 'react'
import styled from 'styled-components'
import { canvas } from '../constants/game'
import Engine from '../engine/Engine'

class ActionLayer extends React.Component {
  private ref: React.RefObject<HTMLCanvasElement> | undefined
  private engine: Engine | null = null
	private handlers

  constructor(handlers: Record<string, () => void>) {
    super(handlers)
    this.ref = createRef<HTMLCanvasElement>()
		this.handlers = handlers
  }

  componentDidMount() {
    console.log('Game: Mount')
    const ctx = this.ref!.current!.getContext('2d')
    if (ctx) {
      this.engine = Engine.get(this.handlers)
      this.engine.start()
    }
  }

  componentWillUnmount() {
    console.log('Game: Unmount')
    if (this.engine) {
      this.engine.stop()
    }
  }

  render() {
    return (
      <Layer>
        <canvas id='game_canvas' ref={this.ref} height={canvas.height} width={canvas.width} />
      </Layer>
    )
  }
}

const Layer = styled.div`
  z-index: 2;
  height: ${canvas.height}px;
  width: ${canvas.width}px;
  position: absolute;
  left: 0px;
  top: 0px;
`

export default ActionLayer
