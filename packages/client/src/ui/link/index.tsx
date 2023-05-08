import React, { FC } from 'react'
import styled from 'styled-components'
import { Link as ReactLink, LinkProps } from 'react-router-dom'

type Props = LinkProps

const Link: FC<Props> = ({ children, ...props }) => {
  return (
    <div>
      <LinkStyled {...props}>{children}</LinkStyled>
    </div>
  )
}

const LinkStyled = styled(ReactLink)`
  &:link,
  &:visited {
    color: ${props => props.theme.colors.link};
    text-decoration: none;
    position: relative;
  }

  &:not(:has(button))::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 4px;
    background-color: ${props => props.theme.colors.accent};
    bottom: -3px;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:not(:has(button)):hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`

export default Link
