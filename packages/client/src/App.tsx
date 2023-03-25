import styled, { ThemeProvider} from 'styled-components'
import { useChangeTheme } from './hooks/useChangeTheme'
import { useFetchServerData } from './hooks/useFetchServerData'
import { GlobalStyles } from './assets/styles/globalStyle'
import React from 'react'
import { H1, H2, H3, P1, P2, P3, P4 } from './assets/styles/texts'
import { media } from './assets/styles/media'
import Button from './ui/button'
import InputForm from './ui/input/index'

function App() {
  // useFetchServerData()
  const {theme, themeToggler} = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      {/* GlobalStyles сброс стилей дефолтный шрифт и прочее*/}
      <GlobalStyles />
      {/*пример как меняется тема */}
      <button onClick={themeToggler}>
        Toggle Theme
      </button>
      {/* компоненты */}
      <Button/>
      <form>
        <InputForm
          id='LoginForm'
          name='Login'
          type='text'
          placeholder='Login'
          errorOn={true}
          errorMessage='error'
        />
        <InputForm
          id='PasswordForm'
          name='Password'
          type='password'
          placeholder='Password'
        />
      </form>
      <Flex>
        <Root>
          {/*пример работы с текстом*/}
          <H1 accent>Text for test</H1>
          <H2 base>Hello</H2>
          <H3>Hello</H3>
          <P1>Hello</P1>
          <P2>Hello</P2>
          <P3>Hello</P3>
          <P4>Hello</P4>
        </Root>
        <Root1 />
      </Flex>
    </ThemeProvider>
  )
}

const Root = styled.div`
  width: 50vw;
  height: 100vh;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.text.textInvert};
  // все селекторы работают как обычно
  & > * {
    display: block;
  }

  // медиа запросы вот так, есть large, middle и small
  ${media.small} {
    background: ${props => props.theme.colors.secondary};;
  }
`

const Root1 = styled.div`
  width: 50vw;
  height: 100vh;
  // можно так
  background: ${({ theme }) => theme.colors.accent};
  // или так
  color: ${props => props.theme.text.textInvert};
`

const Flex = styled.div`
  display: flex;
`

export default App
