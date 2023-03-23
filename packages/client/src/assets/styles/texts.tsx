import styled, {css} from 'styled-components'

const BaseTitle = css<{base?: boolean; accent?:boolean}>`
  color: ${({theme, base, accent}) =>
  base
    ? theme.text.textBase
    : accent
      ? theme.text.accent
      : theme.text.textInvert
};
  line-height: 120%;
`
export const H1 = styled.h1<{weight?: string, base?: boolean; accent?:boolean}>`
  ${BaseTitle};
  font-size: ${props => props.theme.vars.fontSize.xxl};
  font-weight: ${({ weight }) => (weight || 'bold')};
`

export const H2 = styled.h2<{weight?: string, base?: boolean; accent?:boolean}>`
  ${BaseTitle};
  font-size: ${props => props.theme.vars.fontSize.xl};
  font-weight: ${({ weight }) => weight || 'bold'};
`

export const H3 = styled.h3<{weight?: string, base?: boolean; accent?:boolean}>`
  ${BaseTitle};
  font-size: ${props => props.theme.vars.fontSize.l};
  font-weight: ${({ weight }) => weight || 'bold'};
`

export const P1 = styled.p<{weight?: string, base?: boolean; accent?:boolean}>`
  ${BaseTitle};
  font-size: ${props => props.theme.vars.fontSize.m};
  font-weight: ${({ weight }) => weight || 'normal'};
`

export const P2 = styled.p<{weight?: string, base?: boolean; accent?:boolean}>`
  ${BaseTitle};
  font-size: ${props => props.theme.vars.fontSize.s};
  font-weight: ${({ weight }) => (weight || 'normal')};
`

export const P3 = styled.p<{weight?: string, base?: boolean; accent?:boolean}>`
  ${BaseTitle};
  font-size: ${props => props.theme.vars.fontSize.xs};
  font-weight: ${({ weight }) => weight || 'normal'};
`

export const P4 = styled.p<{weight?: string, base?: boolean; accent?:boolean}>`
  ${BaseTitle};
  font-size: ${props => props.theme.vars.fontSize.xxs};
  font-weight: ${({ weight }) => weight || 'normal'};
`
