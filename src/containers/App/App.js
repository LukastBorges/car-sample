import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import Header from '../Header/Header'
import Vehicles from '../Vehicles/Vehicles'
import Reservations from '../Reservations/Reservations'
import { theme } from '../../styles/theme'

import './App.scss'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/">
              <Vehicles />
            </Route>
            <Route path="/reservas">
              <Reservations />
            </Route>
          </Switch>
        </main>
      </Router>
    </ThemeProvider>
  )
}

export default App
