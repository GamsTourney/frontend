import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { routerMiddleware } from 'react-router-redux'
import { getHistory } from '../routes/history'

const middlewares = [
  routerMiddleware(getHistory()),
  thunk
]

export default function configureStore() {
  return createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middlewares)
  )
}
