import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../assets/styles/globalStyle'
import { Themes } from '../constants/themes'
import { BrowserRouter } from 'react-router-dom'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={Themes.light}>
      <GlobalStyles />
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  )
}

const AllTheProviderswithoutBrouserRouter = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={Themes.light}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const customRenderwithoutBrowserRouter = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviderswithoutBrouserRouter, ...options })

export * from '@testing-library/react'
export { customRender as render }
export { customRenderwithoutBrowserRouter as renderWithoutRouter }
