import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from '../containers/Header/Header'
import RootProvider from '../contexts/RootContext'

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<RootProvider {...providerProps}>{ui}</RootProvider>, renderOptions)
}

test('renders header', () => {
  customRender(
    <Router>
      <Header />
    </Router>,
    { user: null }
  )
  const linkElement = screen.getByText(/Reservas/i)
  expect(linkElement).toBeInTheDocument()
})
