import styled from 'styled-components'
import React, { FC } from 'react'
import sky from '../assets/background/MainPage/sky.png'
import cloud1 from '../assets/background/MainPage/cloud1.png'
import cloud2 from '../assets/background/MainPage/cloud2.png'
import cloud3 from '../assets/background/MainPage/cloud3.png'
import mountines from '../assets/background/MainPage/mountines.png'
import ground from '../assets/background/MainPage/ground.png'
import { MouseParallaxContainer, MouseParallaxChild } from 'react-parallax-mouse'

const ParallaxBg: FC = () => {
  return (
    <>
      <Sky>
        <Container globalFactorX={0} globalFactorY={0.3} resetOnLeave>
          <Mountines factorX={0} factorY={0.5}>
            <Ground factorX={0} factorY={-0.5} />
          </Mountines>
          <Cloud1 factorX={0} factorY={-0.3} />
          <Cloud2 factorX={0} factorY={0.2} />
          <Cloud3 factorX={0} factorY={-0.3} />
        </Container>
      </Sky>
    </>
  )
}

const Container = styled(MouseParallaxContainer)`
  height: 100vh;
`

const Sky = styled(MouseParallaxChild)`
  background-image: url(${sky});
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
`
const Cloud1 = styled(MouseParallaxChild)`
  height: 110px;
  width: 201px;
  position: absolute;
  top: 15%;
  left: 5%;
  background-image: url(${cloud1});
  z-index: 5;
`

const Cloud2 = styled(MouseParallaxChild)`
  height: 126px;
  width: 321px;
  position: absolute;
  top: 20%;
  left: 25%;
  background-image: url(${cloud2});
  z-index: 5;
`

const Cloud3 = styled(MouseParallaxChild)`
  height: 92px;
  width: 560px;
  position: absolute;
  top: 15%;
  right: 2%;
  background-image: url(${cloud3});
  z-index: 4;
`

const Mountines = styled(MouseParallaxChild)`
  background-image: url(${mountines});
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 100%;
  z-index: 2;
`
const Ground = styled(MouseParallaxChild)`
  background-image: url(${ground});
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 100%;
  z-index: 3;
`

export default ParallaxBg
