declare const __SERVER_PORT__: number

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare type Indexed<T = any> = { [key in string | symbol]: T }
