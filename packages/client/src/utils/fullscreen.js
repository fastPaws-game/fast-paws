function activateFullscreen(el) {
  const element = el || document.documentElement
  const fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnable || document.webkitFullscreenEnabled

  if (fullscreenEnabled) {
    if (element.requestFullscreen) {
      element.requestFullscreen() // W3C spec
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen() // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen() // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen() // IE/Edge
    }
  }
}

function deactivateFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

function switchFullscreen(fullscreen, el) {
  if (fullscreen) {
    activateFullscreen(el)
  } else {
    const fullscreenElement =
      document.fullscreenElement || document.mozFullScreenElemen || document.webkitFullscreenElement
    if (fullscreenElement) {
      deactivateFullscreen()
    }
  }
}
/* 
document.addEventListener('fullscreenchange', event => {
  const fullscreenElement =
    document.fullscreenElement || document.mozFullScreenElemen || document.webkitFullscreenElement
  if (fullscreenElement) {
    console.log('Entered fullscreen.')
  } else {
    console.log('Exited fullscreen.')
  }
})
 */
export default switchFullscreen
