import React, { createRef } from 'react'
import styled from 'styled-components'
import { CANVAS } from '../../constants/game'
import Engine from '../../engine/Engine'

export default class ActionLayer extends React.Component {
  private ref: React.RefObject<HTMLCanvasElement> | undefined
  private engine: Engine | null = null
  private handlers

  constructor(handlers: Record<string, () => void>) {
    super(handlers)
    this.ref = createRef<HTMLCanvasElement>()
    this.handlers = handlers
  }

  componentDidMount() {
    const ctx = this.ref!.current!.getContext('2d')
    if (ctx) {
      this.engine = Engine.get(this.handlers)
      this.engine.start()
    }
  }

  componentWillUnmount() {
    this.engine?.stop()
  }

  render() {
    return (
      <Wrapper>
        <canvas id="game_canvas" ref={this.ref} width={CANVAS.width} height={CANVAS.height} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
`
