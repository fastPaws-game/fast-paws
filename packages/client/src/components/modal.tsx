import { FC, PropsWithChildren, useEffect, MouseEvent, useCallback, memo } from 'react'
import styled from 'styled-components'
import scrollLock from '../utils/scrollLock'
import useEscape from '../hooks/useEscape'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
} & PropsWithChildren

const Modal: FC<Props> = props => {
  const { visible, handleClose, children, outSideClickEnable = false } = props

  useEffect(() => {
    if (visible) scrollLock.enable()
    return () => scrollLock.disable()
  }, [visible])

  // useEscape(handleClose)

  const handleOutSideClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const { target, currentTarget } = event
      if (target === currentTarget && outSideClickEnable) handleClose()
    },
    [handleClose]
  )

  if (!visible) return null

  return <Root onClick={handleOutSideClick}>{children}</Root>
}

const Root = styled.div`
  z-index: 900;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.37);
  display: flex;
  align-items: center;
  justify-content: center;
`

export default memo(Modal)
