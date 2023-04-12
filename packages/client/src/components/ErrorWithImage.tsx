import React, { FC } from 'react'
import { H2, H3 } from '../assets/styles/texts'
import styled from 'styled-components'
import { media } from '../assets/styles/media'
import IconError from '../assets/icons/IconError'
import Button from '../ui/button'
import { useNavigate } from 'react-router'

type Props = {
  type: 'notFound' | 'serverError'
}
const ErrorWithImage: FC<Props> = props => {
  const { type } = props
  const navigation = useNavigate()

  const clickHandler = () => {
    navigation(-1)
  }
  return (
    <Content>
      <Header>
        <H2>OOPS!</H2>
        <H3 weight={'normal'}>
          {type === 'notFound'
            ? 'The page you requested could not be found'
            : 'A server error has occurred'}
        </H3>
      </Header>
      <ImageContainer>
        <IconContainer>
          <IconError />
        </IconContainer>
        <ErrorCode>{type === 'notFound' ? '404' : '500'}</ErrorCode>
      </ImageContainer>
      <Button size="small" onClick={clickHandler}>
        Back
      </Button>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`

const ImageContainer = styled.div`
  position: relative;
  text-align: center;
`

const ErrorCode = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.text.error};
  bottom: 40px;
  font-size: 70px;
  font-weight: bold;
  left: calc(50% - 57px);

  ${media.small} {
    color: ${({ theme }) => theme.text.textInvert};
    position: initial;
    font-size: 50px;
  }
`

const IconContainer = styled.div`
  width: 100%;
  max-width: 455px;

  ${media.small} {
    display: none;
  }
`

export default ErrorWithImage
