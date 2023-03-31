import { useEffect } from 'react'

const useEscape = (onEscape: () => void) => {
  const handleEsc = (event: KeyboardEvent) => {
    if (event.keyCode === 27) onEscape()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])
}

export default useEscape
