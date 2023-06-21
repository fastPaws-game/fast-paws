import styled from 'styled-components'
import React, { FC, useEffect, useRef } from 'react'
import MistyMountains_layer1Url from '../assets/background/MistyMountains/layer_1.png'
import MistyMountains_layer2Url from '../assets/background/MistyMountains/layer_2.png'
import MistyMountains_layer3Url from '../assets/background/MistyMountains/layer_3.png'

const ParallaxBg: FC = () => {
  const parallaxElem = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousemove', parallax)
    // return document.removeEventListener("mousemove", parallax)
  }, [])

  function parallax(e: MouseEvent) {
    const elem = parallaxElem.current
    const _w = window.innerWidth / 2
    const _h = window.innerHeight / 2
    const mouseX = e.clientX
    const mouseY = e.clientY
    const depth1 = `${50 - (mouseX - _w) * 0.01}% 0`
    const depth2 = `${50 - (mouseX - _w) * 0.05}% ${100 - (mouseY - _h) * 0.005}%`
    const depth3 = `${50 - (mouseX - _w) * 0.1}% 100%`
    elem!.style.backgroundPosition = `${depth3}, ${depth2}, ${depth1}`
  }

  return <Parallax ref={parallaxElem} />
}

const Parallax = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #cdeefb;
  background-image: url(${MistyMountains_layer3Url}), url(${MistyMountains_layer2Url}), url(${MistyMountains_layer1Url});
  background-size: 90%;
  background-repeat: repeat-x;
  background-position: 100% 100%, 100% 100%, 0 0;
`

export default ParallaxBg
