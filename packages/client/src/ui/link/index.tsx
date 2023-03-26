import React, { FC, RefAttributes } from 'react'
import styled from 'styled-components'
import { Link as ReactLink, LinkProps } from 'react-router-dom'

type OuterProps = LinkProps & RefAttributes<HTMLAnchorElement>

const Link: FC<OuterProps> = ({children, ...props}) => {
  return (
    <LinkStyled {...props}>{children}</LinkStyled>
  )
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
