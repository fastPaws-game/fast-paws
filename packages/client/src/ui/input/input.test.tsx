import Input, { typeStyleInput } from './index'
import { render, screen } from '../../utils/test-utils'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('Input components', () => {
  const Props = {
    typeStyle: typeStyleInput.form,
  }

  test.skip('render Input component', () => {
    const tree = render(<Input {...Props} />)

    expect(tree).toMatchSnapshot()
  })

  test('check input value', async () => {
    render(<Input {...Props} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Test input value')

    expect(input).toHaveValue('Test input value')
  })
})
