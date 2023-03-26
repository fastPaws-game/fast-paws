import React, { FC, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { media } from '../../assets/styles/media';

type OuterProps = {
  src?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<OuterProps> = ({ children, ...props }) => {
  let {form} = props;
  if (form === 'icon-big') {
    return (
      <ButtonIconStyled {...props}>
        <img src={props.src}/>
      </ButtonIconStyled>
      )
  } else if (form === 'icon-small') {
    return (
      <ButtonIconStyled {...props}>
        <img src={props.src}/>
      </ButtonIconStyled>
      )
  } else if (form === 'play') {
    return (
      <ButtonMainStyled {...props}>{children}</ButtonMainStyled>
      )
    } else {
      console.log(children);
    return (
      <ButtonMainStyled {...props}>{children}</ButtonMainStyled>
      )
    }
}

const ButtonMainStyled = styled.button`
  width: ${props => props.form === 'play' ? '395px' : '145px'};
  height: ${props => props.form === 'play' ? '100px' : '35px'};
  border-radius: ${props => props.form === 'play' ? '56px' : props.theme.borders.primary};
  border: none;
  box-shadow: ${props => props.theme.shadows.secondary};
  background-color: ${props => props.form === 'play' ? props.theme.colors.play : props.theme.colors.accent};
  font-size: ${props => props.form === 'play' ? '30px' : '15px'};
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
    width: ${props => props.form === 'play' ? '244px' : '110px'};
    height: ${props => props.form === 'play' ? '62px' : '30px'};
  }
`

const ButtonIconStyled = styled.button`
  width: ${props => props.form === 'icon-big' ? '100px' : '70px'};
  height: ${props => props.form === 'icon-big' ? '100px' : '70px'};
  border-radius: 50%;
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
    width: ${props => props.form === 'icon-big' ? '85px' : '45px'};
    height: ${props => props.form === 'icon-big' ? '85px' : '45px'};
  }
`

export default Button
