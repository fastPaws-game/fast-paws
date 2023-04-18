import AuthForm from '../AuthForm'
import { render, fireEvent, waitFor, screen } from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux'
import {store} from '../../store/index'

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

  test('Submit button without inputs data', async () => {
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

  test.skip('rendering and submitting a basic form', async () => {
    render(<AuthForm onSubmitFrom={handleSubmit} />)
    const user = userEvent.setup()

    await user.type(screen.getByRole('textbox', { name: '' }), 'John')

    await user.click(screen.getByRole('button', { name: /Log in/i }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        login: 'John',
      })
    )
  })

  test.skip('Link', async () => {
    const { getByText } = render(<AuthForm onSubmitFrom={handleSubmit} />)
    const link = getByText('Registration')

    fireEvent.click(link)
  })
})
