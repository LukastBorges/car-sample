import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import Header from '../Header/Header'
import Reservations from '../Reservations/Reservations'
import { theme } from '../../styles/theme'

import './App.scss'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router className="App">
        <Header />
        <Switch>
          <Route path="/">
            <Reservations />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
