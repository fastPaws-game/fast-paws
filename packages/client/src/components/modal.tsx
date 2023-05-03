import { FC, memo, MouseEvent, PropsWithChildren, useCallback, useEffect } from 'react'
import styled from 'styled-components'
// import scrollLock from '../utils/scrollLock'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
} & PropsWithChildren

const Modal: FC<Props> = props => {
  const { visible, handleClose, children, outSideClickEnable = false } = props

  const onkeyup = (event: KeyboardEvent) => {
    if (event.code == 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    if (visible) {
      window.addEventListener('keyup', onkeyup)
      // scrollLock.enable()
    } else {
      window.removeEventListener('keyup', onkeyup)
    }
    // return () => scrollLock.disable()
  }, [visible])

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
  width: 100svw;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.37);
  display: flex;
  align-items: center;
  justify-content: center;
`

export default memo(Modal)
