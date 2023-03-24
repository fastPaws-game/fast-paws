import { FC, ButtonHTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'

type Button = FC<ButtonHTMLAttributes<HTMLButtonElement>>;

const ButtonStyled = styled.button`
  width: 110px;
  height: 30px;
  border-radius: ${props => props.theme.borders.primary};
  border: none;
  box-shadow: ${props => props.theme.shadows.secondary};
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.text.textBase};
  &:hover,  &:focus{
    background-color: ${props => props.theme.colors.accentHover};
  }
  &:focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline-color: ${props => props.theme.colors.focus};
    outline-width: 1px;
  }
`

const Button: Button = ({ children }) => {
  return (
    <ButtonStyled>{children}</ButtonStyled>
  )
}

export default Button
