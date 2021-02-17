import { render, waitFor, cleanup, screen } from '@testing-library/react'
import App from '../containers/App/App'

afterEach(cleanup)

test('renders app', async () => {
  render(<App />)
  await waitFor(() => {
    const linkElement = screen.getByText(/LocAqui/i)

    expect(linkElement).toBeInTheDocument()
  })
})
