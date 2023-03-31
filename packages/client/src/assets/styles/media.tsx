type Breakpoints<T = number> = {
  large?: T,
  small?: T,
}

export const breakpoints: Breakpoints = {
  large: 1050,
  small: 460
}

export const media = Object.entries(breakpoints).reduce<Breakpoints<string>>(
  (acc, [key, value]) => {
    acc[key as keyof Breakpoints] = `@media screen and (max-height: ${value}px)`
    return acc
  },
  {}
)
