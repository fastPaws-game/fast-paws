import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { CANVAS } from '../constants/game'
import BgMotion from '../engine/BgMotion'

const InterfaceLayer = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvas!.current!.getContext('2d')
    const motion = new BgMotion(ctx || undefined)
  }, [])

  return (
    <Wrapper>
      <canvas ref={canvas} width={CANVAS.width} height={CANVAS.height} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
`
export default InterfaceLayer
