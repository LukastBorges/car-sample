import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import Toast from '../../components/Toast/Toast'
import { theme } from '../../styles/theme'

import './App.scss'

const Header = lazy(() => import('../Header/Header'))
const Vehicles = lazy(() => import('../Vehicles/Vehicles'))
const Reservations = lazy(() => import('../Reservations/Reservations'))
const RootProvider = lazy(() => import('../../contexts/RootContext'))

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </ThemeProvider>
  )
}

export default App
