import React, { FunctionComponent, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CANVAS } from '../../constants/game'
import Engine from '../../engine/Engine'
import { useAppSelector } from '../../hooks/store'
import { GameSelectors } from '../../store/game/GameSelectors'

type Props = {
  handlers: Record<string, (value?: any) => void>
}
const ActionLayer: FunctionComponent<Props> = props => {
  const { handlers } = props
  let engine: Engine | null = null

  const ref = useRef<HTMLCanvasElement>(null)
  const score = useAppSelector(GameSelectors.getScore)
  const catched = useAppSelector(GameSelectors.getCatched)

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d')
      if (ctx) {
        engine = Engine.get(handlers)
        engine.start(score, catched)
      }
    }
    return () => {
      engine?.stop()
    }
  }, [])

  return (
    <Wrapper>
      <canvas id="game_canvas" ref={ref} width={CANVAS.width} height={CANVAS.height} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

export default ActionLayer
