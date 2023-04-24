import { TOOLTIP } from '../constants/game'

export class Tooltip {
  private tooltip = {
    shown: false,
    firstTip: true,
    firstAnimal: true,
    firstBarrier: true,
    firstTimeout: true,
  }
  private setTooltip: (tooltip: string) => void
  private static __instance: Tooltip

  constructor(setTooltip: (tooltip: string) => void) {
    this.setTooltip = setTooltip
    if (Tooltip.__instance) return Tooltip.__instance
  }

  private set(text?: string) {
    if (!text && this.tooltip.shown) {
      this.setTooltip('')
      this.tooltip.shown = false
      this.tooltip.firstTip = false
      return
    }
    if (typeof text == 'string') {
      this.setTooltip(text)
      this.tooltip.shown = true
    }
  }

  public hide() {
    this.set()
  }

  public show = (reason?: 'start' | 'timeout' | 'barrier' | 'animal') => {
		console.log('Tooltip:',reason)
    switch (reason) {
      case 'start':
        if (this.tooltip.firstTip) {
          this.tooltip.firstTip = false
          this.set(TOOLTIP.newGame)
        }
        break
      case 'barrier':
        if (this.tooltip.firstBarrier) {
          this.tooltip.firstBarrier = false
          this.set(TOOLTIP.firstBarrier)
        }
        break
      case 'timeout':
        if (this.tooltip.firstTimeout) {
          this.tooltip.firstTimeout = false
          this.set(TOOLTIP.firstTimeout)
        }
        break
			case 'animal':
        if (this.tooltip.firstAnimal) {
          this.tooltip.firstAnimal = false
          this.set(TOOLTIP.firstAnimal)
        }
    }
  }
}
