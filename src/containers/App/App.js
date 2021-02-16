import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import Header from '../Header/Header'
import Vehicles from '../Vehicles/Vehicles'
import Reservations from '../Reservations/Reservations'
import RootProvider from '../../contexts/RootContext'

import Toast from '../../components/Toast/Toast'
import { theme } from '../../styles/theme'

import './App.scss'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RootProvider>
        <Router>
          <Header />
          <main>
            <Switch>
              <Route path="/reservas">
                <Reservations />
              </Route>
              <Route path="/">
                <Vehicles />
              </Route>
            </Switch>
          </main>
        </Router>
        <Toast />
      </RootProvider>
    </ThemeProvider>
  )
}

export default App
