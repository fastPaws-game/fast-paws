import { render } from '@testing-library/react'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<div>test</div>)
  expect('test').toBe('test')
})
