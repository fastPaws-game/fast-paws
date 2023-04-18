import Input, { typeStyleInput } from './index'
import { render } from '../../utils/test-utils'

describe('Input components', () => {
  const Props = {
    typeStyle: typeStyleInput.form,
  }

  test('render Input component', () => {
    const tree = render(<Input {...Props} />)

    expect(tree).toMatchSnapshot()
  })
})
