import { render, screen } from '@testing-library/react'
import Reservations from '../containers/Reservations/Reservations'
import RootProvider from '../contexts/RootContext'

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<RootProvider {...providerProps}>{ui}</RootProvider>, renderOptions)
}

test('renders reservations view', () => {
  customRender(<Reservations />, { dispatch: () => {} })
  const linkElement = screen.getByText(/Reservas atuais/i)

  expect(linkElement).toBeInTheDocument()
})
