import React, { FC } from 'react'
import { H2, H3 } from '../assets/styles/texts'
import styled from 'styled-components'
import { media } from '../assets/styles/media'
import Icon from '../assets/images/errorImage.png'

type Props = {
  type: 'notFound' | 'serverError'
}
const ErrorWithImage: FC<Props> = (props) => {
  const { type } = props

  return (
    <Content>
      <Header>
        <H2>OOPS!</H2>
        <H3 weight={'normal'}>
          {
            type === 'notFound'
              ? 'The Page You Requested Could Not Be Found'
              : 'A server error has occurred'
          }
        </H3>
      </Header>
      <ImageContainer>
        <Image src={Icon} />
        <ErrorCode>{type === 'notFound' ? '404' : '500'}</ErrorCode>
      </ImageContainer>
      <button>Back</button>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
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
  bottom: 72px;
  font-size: 70px;
  font-weight: bold;
  left: calc(50% - 57px);

  ${media.middle} {
    color: ${({ theme }) => theme.text.textInvert};
    position: initial;
    font-size: 50px;
  }
`

const Image = styled.img`
  width: 100%;
  max-width: 455px;

  ${media.middle} {
    display: none;
  }
`

export default ErrorWithImage
