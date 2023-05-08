type Breakpoints<T = number> = {
  xl?: T
  large?: T
  middle?: T
  small?: T
}

export const breakpoints: Breakpoints = {
  xl: 1300,
  large: 1050,
  middle: 800,
  small: 481,
}

export const media = Object.entries(breakpoints).reduce<Breakpoints<string>>((acc, [key, value]) => {
  acc[key as keyof Breakpoints] = `@media screen and (max-width: ${value}px)`
  return acc
}, {})
