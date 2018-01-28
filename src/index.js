import React from 'react'
import { render } from 'react-dom'
import App from 'modules/app'

import configureStore from 'store/configure'
const store = configureStore()

render(<App store={store} />, document.getElementById('root'))
