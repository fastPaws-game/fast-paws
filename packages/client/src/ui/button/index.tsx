import { FC, ButtonHTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { media } from '../../assets/styles/media'

type Props = {
  icon?: ReactElement
  size?: string
  light?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<Props> = props => {
  const { icon, children } = props
  const ButtonStyled = icon ? ButtonIconStyled : ButtonMainStyled

  return <ButtonStyled {...props}>{icon ? icon : children}</ButtonStyled>
}

const ButtonMainStyled = styled.button<{ size?: string }>`
  width: ${props => (props.size === 'big' ? '395px' : '145px')};
  height: ${props => (props.size === 'big' ? '100px' : '35px')};
  border-radius: ${props =>
    props.size === 'big'
      ? props.theme.borders.secondary
      : props.theme.borders.primary};
  border: none;
  transition: 0.3s;
  box-shadow: ${props => props.theme.shadows.secondary};
  background-color: ${props =>
    props.size === 'big' ? props.theme.colors.play : props.theme.colors.accent};
  font-size: ${props =>
    props.size === 'big'
      ? props.theme.vars.fontSize.xl
      : props.theme.vars.fontSize.s};
  color: ${props => props.theme.text.everWhite};

  &:disabled {
    opacity: 0.6;
  }

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: ${props => props.theme.colors.accentHover};
    transition: 0.3s;
  }

  &:not([disabled]):focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline-color: ${props => props.theme.colors.focus};
    outline-width: 1px;
    transition: 0.3s;
  }

  ${media.small} {
    width: ${props => (props.size === 'big' ? '332px' : '110px')};
    height: ${props => (props.size === 'big' ? '85px' : '30px')};
  }
`

const ButtonIconStyled = styled.button<{ size?: string, light?: boolean }>`
  width: ${props => (props.size === 'big' ? '100px' : '70px')};
  height: ${props => (props.size === 'big' ? '100px' : '70px')};
  border-radius: ${props => props.theme.borders.round};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  background-color: ${props => (props.light ? props.theme.colors.accent : props.theme.colors.play)};
  color: ${props => props.theme.text.textBase};

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: ${props => props.theme.colors.accentHover};
    transition: 0.3s;
  }

  &:not([disabled]):focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline-color: ${props => props.theme.colors.focus};
    outline-width: 1px;
    transition: 0.3s;
  }

  ${media.small} {
    width: ${props => (props.size === 'big' ? '85px' : '45px')};
    height: ${props => (props.size === 'big' ? '85px' : '45px')};
  }
`
export default Button
