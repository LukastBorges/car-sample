import { render, screen } from '@testing-library/react'
import Vehicles from '../containers/Vehicles/Vehicles'
import RootProvider from '../contexts/RootContext'

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<RootProvider {...providerProps}>{ui}</RootProvider>, renderOptions)
}

test('renders vehicles view', () => {
  customRender(<Vehicles />, { dispatch: () => {} })
  const linkElement = screen.getByText(/Filtro:/i)

  expect(linkElement).toBeInTheDocument()
})
