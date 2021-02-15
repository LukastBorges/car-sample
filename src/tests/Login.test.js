import { fireEvent, render, screen } from '@testing-library/react'
import Login from '../containers/Login/Login'

beforeEach(() => {
  render(<Login />)
  const button = screen.getByTestId('account-button')

  fireEvent.click(button)
})

test('checks for login popover', () => {
  const linkElement = screen.getByText(/Efetuar login/i)

  expect(linkElement).toBeInTheDocument()
})
