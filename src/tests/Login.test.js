import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import Login from '../containers/Login/Login'
import RootProvider from '../contexts/RootContext'

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<RootProvider {...providerProps}>{ui}</RootProvider>, renderOptions)
}

beforeEach(() => {
  cleanup()
  customRender(<Login />, { user: null })
  const button = screen.getByTestId('account-button')

  fireEvent.click(button)
})

test('checks for login popover', () => {
  const linkElement = screen.getByText(/Efetuar login/i)

  expect(linkElement).toBeInTheDocument()
})

test('checks for signup popover', async () => {
  const linkButton = screen.getByText(/Fazer cadastro/i)

  fireEvent.click(linkButton)
  await waitFor(() => {
    const linkElement = screen.getByText(/Cadastrar novo usuário/i)

    expect(linkElement).toBeInTheDocument()
  })
})
