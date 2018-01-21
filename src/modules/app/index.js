import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import routes from 'routes'
import { getHistory } from 'routes/history'
import './style.scss'

class App extends Component {
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={getHistory()}>
          <div>{routes}</div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
