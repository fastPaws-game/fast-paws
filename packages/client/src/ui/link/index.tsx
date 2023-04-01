import React, { FC } from 'react'
import styled from 'styled-components/macro'
import { Link as ReactLink, LinkProps } from 'react-router-dom'

type Props = LinkProps

const Link: FC<Props> = ({ children, ...props }) => {
  return <LinkStyled {...props}>{children}</LinkStyled>
}

const LinkStyled = styled(ReactLink)`
  &:link,
  &:visited {
    color: ${props => props.theme.colors.link};
    text-decoration: none;
  }
  &:hover,
  &:active {
    text-decoration: underline;
  }
`

export default Link
