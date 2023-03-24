import { FC, LinkHTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'

type LinkProps = {
    href?: string;
} & LinkHTMLAttributes<HTMLLinkElement>
type Link = FC<LinkProps>;

const LinkStyled = styled.a`
&:link, &:visited {
  color: ${props => props.theme.colors.link};
  text-decoration: none;
}
&:hover, &:active {
    text-decoration: underline;
}
`

const Link: Link = ({ children, ...props }) => {
  return (
    <LinkStyled href={props.href}>{children}</LinkStyled>
  )
}

export default Link
