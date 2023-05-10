import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { media } from '../assets/styles/media'

type Props = {
  padding?: number | string
} & PropsWithChildren

const ContrastingWrapper: FC<Props> = props => {
  const { children, padding } = props
  return <Wrapper padding={padding}>{children}</Wrapper>
}

const Wrapper = styled.div<{ padding?: number | string }>`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.textBase};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.forFormBackground};
  padding: ${({ padding = '15px' }) => (typeof padding === 'string' ? padding : `${padding}px`)};

  ${media.middle} {
    padding: ${({ padding = '10px' }) => (typeof padding === 'string' ? padding : `${padding * 0.8}px`)};
    padding-top: 30px;
    min-width: 90%;
  }
`
export default ContrastingWrapper
