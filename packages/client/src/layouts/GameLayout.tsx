import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { canvas } from '../constants/game'

const GameLayout: FC<PropsWithChildren> = props => {
  const { children } = props
  return (
    <Root>
      <GameWindow>{children}</GameWindow>
    </Root>
  )
}

const Root = styled.div`
  background-image: linear-gradient(${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`

const GameWindow = styled.div`
  display: block;
  height: ${canvas.height}px;
  width: ${canvas.width}px;
  position: relative;
`

export default GameLayout
