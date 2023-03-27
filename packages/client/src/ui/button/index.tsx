import React, { FC, ButtonHTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { media } from '../../assets/styles/media';

type Props = {
  icon?: ReactElement;
  size?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ children, ...props }) => {
  const {icon} = props;
  if (icon) {
    return (
      <ButtonIconStyled {...props}>{icon}</ButtonIconStyled>
      )
  } else {
    return (
      <ButtonMainStyled {...props}>{children}</ButtonMainStyled>
      )
    }
}

const ButtonMainStyled = styled.button<{size?: string}>`
  width: ${props => props.size === 'big' ? '395px' : '145px'};
  height: ${props => props.size === 'big' ? '100px' : '35px'};
  border-radius: ${props => props.size === 'big' ? props.theme.borders.secondary : props.theme.borders.primary};
  border: none;
  box-shadow: ${props => props.theme.shadows.secondary};
  background-color: ${props => props.size === 'big' ? props.theme.colors.play : props.theme.colors.accent};
  font-size: ${props => props.size === 'big' ? props.theme.vars.fontSize.xl : props.theme.vars.fontSize.s};
  color: ${props => props.theme.text.everWhite};
  &:hover,
  &:focus{
    background-color: ${props => props.theme.colors.accentHover};
  }
  &:focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline-color: ${props => props.theme.colors.focus};
    outline-width: 1px;
  }

  ${media.small} {
    width: ${props => props.size === 'big' ? '244px' : '110px'};
    height: ${props => props.size === 'big' ? '62px' : '30px'};
  }
`

const ButtonIconStyled = styled.button<{size?: string}>`
  width: ${props => props.size === 'big' ? '100px' : '70px'};
  height: ${props => props.size === 'big' ? '100px' : '70px'};
  border-radius: ${props => props.theme.borders.round};;
  border: none;
  background-color: ${props => props.theme.colors.play};
  color: ${props => props.theme.text.textBase};
  &:hover,
  &:focus{
    background-color: ${props => props.theme.colors.accentHover};
  }
  &:focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline-color: ${props => props.theme.colors.focus};
    outline-width: 1px;
  }

  ${media.small} {
    width: ${props => props.size === 'big' ? '85px' : '45px'};
    height: ${props => props.size === 'big' ? '85px' : '45px'};
  }
`

export default Button
