import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import Modal from './modal'


type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
} & PropsWithChildren

const Popup: FC<Props> = props => {
  const { children, ...otherProps } = props

  return (
    <Modal {...otherProps}>
      <Content>{children}</Content>
    </Modal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  width: 415px;
  min-height: 210px;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.forFormBackground};
  border-radius: 15px;
  padding: 35px;
  top: 50%;
  left: 50%;
`
export default Popup
