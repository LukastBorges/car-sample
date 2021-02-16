import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import { rootReducer } from '../reducers/rootReducer'

const initialState = {
  user: null,
  triggerLogin: false,
  toast: { type: '', msg: '' }
}

export const RootContext = createContext()

const RootProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <RootContext.Provider value={{ ...state, dispatch }}>{props.children}</RootContext.Provider>
  )
}

RootProvider.propTypes = {
  children: PropTypes.node
}

export default RootProvider
