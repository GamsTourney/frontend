import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import routes from 'routes'
import { getHistory } from 'routes/history'
import Navigation from './navigation'
import './style.scss'

const stylesheets = [
  "https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
]

class App extends Component {
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={getHistory()}>
          <div>
            {stylesheets.map((s) => <link key={s} rel='stylesheet' href={s} />)}
            <Navigation />
            <div className='content'>
              {routes}
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
