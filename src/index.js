import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import configureStore from './store/configure'
import App from 'modules/app'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
