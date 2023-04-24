import AuthForm from '../AuthForm'
import RegistrationForm from '../RegistrationForm'
import { render, renderWithoutRouter, fireEvent, waitFor, screen } from '../../utils/test-utils'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../store/index'

describe('AuthForm components', () => {
  const handleSubmit = jest.fn()

  test('render AuthForm component', () => {
    const tree = render(
      <Provider store={store}>
        <AuthForm onSubmitFrom={handleSubmit} />
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('Check errorMessage', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <AuthForm onSubmitFrom={handleSubmit} />
      </Provider>
    )

    fireEvent.submit(getByText('Log in'))

    await waitFor(() => {
      const login = getByText('Пожалуйста, укажите корректный логин')
      const password = getByText('Пароль дожен содержать хотя бы одну заглавную букву и цифру')
      expect(login.textContent).toBe('Пожалуйста, укажите корректный логин')
      expect(password.textContent).toBe('Пароль дожен содержать хотя бы одну заглавную букву и цифру')
    })
  })

  test('check value in input', async () => {
    const user = userEvent.setup()
    render(
      <Provider store={store}>
        <AuthForm onSubmitFrom={handleSubmit} />
      </Provider>
    )
    const inputLogin = screen.getByPlaceholderText('Login')
    const inputPassword = screen.getByPlaceholderText('Password')

    await user.type(inputLogin, 'LoginTest')
    await user.type(inputPassword, 'LoginPassword')

    expect(inputLogin).toHaveValue('LoginTest')
    expect(inputPassword).toHaveValue('LoginPassword')
  })

  test.only('Link', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithoutRouter(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<AuthForm onSubmitFrom={handleSubmit} />} />
            <Route path="/signup" element={<RegistrationForm handleRegistration={handleSubmit}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Log in')).toBeInTheDocument()

    const link = getByText('Registration')
    await user.click(link)

    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })
})
