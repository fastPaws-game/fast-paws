import React, { createRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import canvas from '../constants/canvas'
import Cat from '../assets/sprites/Cat2.gif'
// @ts-ignore
import GIF from '../utils/gif.js'

// Сложил пока всё одну кучу.
// Ещё и внутрь реакт-компонента...
// Деструктуризацией займусь когда будет рабочий вариант
// и сложится понимание как именно это лучше сделать.
const SPEED = 1 // Fast: 0.5 Normal: 1
const updateTime = 34 * SPEED
const ActionPositionVertical = canvas.height - canvas.height / 14
const trajectoryStep = 2

const SpriteCat = {
  size: 100,
  ar: 0.74,
}

const jumpHeightMin = SpriteCat.size / 2
const jumpHeightMax = (SpriteCat.size * 3) / 2
const sCatX = canvas.width / 3
const sCatY = ActionPositionVertical

let myGif: {
  onerror: (e: any) => void
  load: (arg0: string) => void
  frames: { image: any }[]
  loading: any
  image: any
  lastFrame: { image: CanvasImageSource } | null
}

const url = Cat
// Need to be moved in to a preloader.
// Timeout just waits till script has been parsed and executed then starts loading a gif
setTimeout(() => {
  myGif = GIF() // creates a new gif
  myGif.onerror = function (e) {
    console.log('Gif loading error ' + e.type)
  }
  myGif.load(url)
}, 0)

class ActionLayer extends React.Component {
  private ref: React.RefObject<HTMLCanvasElement> | undefined
  private action: 'run' | 'stay' | 'jump' | 'path' | null
  private ctx: CanvasRenderingContext2D | null = null
  private hold: boolean
  private jumpHeight: number = jumpHeightMin
  private jumpStage = 0
  private trajectoryDirection = 1
  private CatX = sCatX
  private CatY = sCatY

  constructor(props: any) {
    super(props)
    this.ref = createRef<HTMLCanvasElement>()
    this.state = {
      action: null,
    }
    this.action = null
    this.ctx = null
    this.hold = false
  }

  private onkeydown = (event: KeyboardEvent) => {
    if (!this.hold && event.code == 'Space') {
      this.hold = true
      this.action = null // Stop all current actions
      setTimeout(() => {
        // Start a new action
        this.action = 'path'
        this.jumpHeight = jumpHeightMin
        requestAnimationFrame(this.update)
      }, updateTime * 2)
    }
  }

  private onkeyup = (event: KeyboardEvent) => {
    if (event.code == 'Space') {
      this.hold = false
      // this.action='stay';
      this.action = 'jump'
      this.jumpStage = -Math.PI
      console.log('Jump height: ', this.jumpHeight)
    }
  }

  private registerEvents = () => {
    window.addEventListener('keydown', this.onkeydown)
    window.addEventListener('keyup', this.onkeyup)
    console.log('registerEvents')
  }

  private unRegister = () => {
    window.removeEventListener('keydown', this.onkeydown)
    window.removeEventListener('keyup', this.onkeyup)
    console.log('unRegister')
  }

  private drawImage = (image: HTMLCanvasElement, x: number, y: number) => {
    if (this.ctx) {
      // this.ctx.rotate(rot);
      const w = SpriteCat.size
      const h = SpriteCat.size * SpriteCat.ar

      // Shadow
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      this.ctx.beginPath()
      this.ctx.ellipse(x, this.CatY, w / 4, h / 10, 0, 0, 2 * Math.PI)
      this.ctx.fill()

      this.ctx.drawImage(image, x - w / 2, y - h, w, h)
    }
  }

  private drawTrajectory = (x: number, y: number, j: number) => {
    if (this.ctx) {
      const w = SpriteCat.size
      const h = SpriteCat.size * SpriteCat.ar

      // Outer path
      this.ctx.strokeStyle = 'black'
      this.ctx.beginPath()
      this.ctx.ellipse(x + j, y - 10, j, j, 0, Math.PI, 0)
      this.ctx.lineWidth = 4
      this.ctx.lineCap = 'round'
      this.ctx.stroke()

      // Inner path
      this.ctx.strokeStyle = 'rgba(122, 208, 41, 1)'
      this.ctx.beginPath()
      this.ctx.ellipse(x + j, y - 10, j, j, 0, Math.PI, 0)
      this.ctx.lineWidth = 2
      this.ctx.stroke()

      // Target point shadow
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      this.ctx.beginPath()
      this.ctx.ellipse(x + j * 2, y, w / 4, h / 10, 0, 0, 2 * Math.PI)
      this.ctx.fill()
    }
  }

  private defineTrajectory = () => {
    this.jumpHeight += trajectoryStep * this.trajectoryDirection
    if (this.jumpHeight >= jumpHeightMax) this.trajectoryDirection = -1
    if (this.jumpHeight <= jumpHeightMin) this.trajectoryDirection = 1
    this.drawTrajectory(this.CatX, this.CatY, this.jumpHeight)
  }

  private defineJump = () => {
    const r = this.jumpHeight // радиус
    const points = r / 4 // количество точек
    const step = Math.PI / points
    this.jumpStage += step
    const i = this.jumpStage
    if (i < 0) {
      this.CatX = sCatX + r + r * Math.cos(i)
      const y = this.CatY + r * Math.sin(i)
      // this.ctx!.fillRect(x, y, 3, 3);
      const frameIndex = Math.floor(((i + Math.PI) / Math.PI) * 3)
      // console.log(a);
      this.drawImage(myGif.frames[frameIndex].image, this.CatX, y)
    } else {
      this.action = 'run'
      requestAnimationFrame(this.update)
    }

    /* 		for(let i = -Math.PI; i < 0; i += step){
			let x = this.CatX + r + r * Math.cos(i);
			let y = this.CatY + r * Math.sin(i);
			this.ctx!.fillRect(x, y, 2, 2);
		} */
  }

  // main update function
  private update = (timer: number) => {
    if (this.ctx && myGif && !myGif.loading) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      switch (this.action) {
        case 'run':
          console.log('render run')
          this.drawImage(myGif.image, this.CatX, this.CatY)
          break
        case 'path':
          console.log('render trajectory')
          this.defineTrajectory()
          this.drawImage(myGif.frames[0].image, this.CatX, this.CatY)
          break
        case 'jump':
          console.log('render jump')
          this.defineJump()
          break
        default: //'stay'
          this.drawImage(myGif.frames[2].image, this.CatX, this.CatY)
      }
      if (
        this.action == 'run' ||
        this.action == 'path' ||
        this.action == 'jump'
      )
        setTimeout(this.update, updateTime)
    } else {
      this.ctx!.fillText('Waiting for GIF image ', 10, 20)
      // requestAnimationFrame(this.update)
      setTimeout(this.update, 500)
    }
  }

  componentDidMount() {
    console.log('Game: Mount')

    this.registerEvents()
    this.ctx = this.ref!.current!.getContext('2d')
    requestAnimationFrame(this.update)
  }

  componentWillUnmount() {
    console.log('Game: Unmount')
    this.unRegister()
  }

  render() {
    return (
      <Layer>
        <canvas ref={this.ref} height={canvas.height} width={canvas.width} />
      </Layer>
    )
  }
}

const Layer = styled.div`
  z-index: 2;
  height: ${canvas.height}px;
  width: ${canvas.width}px;
  position: absolute;
  left: 0px;
  top: 0px;
`

export default ActionLayer
