import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from '../Header/Header'
import Reservations from '../Reservations/Reservations'

import './App.scss'

const App = () => {
  return (
    <Router className="App">
      <Header />
      <Switch>
        <Route path="/">
          <Reservations />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
