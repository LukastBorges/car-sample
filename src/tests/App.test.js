import { render, screen } from '@testing-library/react'
import App from '../containers/App/App'

test('renders app', () => {
  render(<App />)
  const linkElement = screen.getByText(/locavel/i)
  expect(linkElement).toBeInTheDocument()
})
