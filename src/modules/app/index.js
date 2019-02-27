import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import routes from 'routes'
import { getHistory } from 'routes/history'
import Navigation from './navigation'
import './styles.css'

const stylesheets = [
  "https://bootswatch.com/3/paper/bootstrap.min.css"
]

class App extends Component {

  componentDidMount() {
    document.title = "Gams 2018"
  }

  render() {
    const { store } = this.props
    console.log(this.props)

    return (
      <Provider store={store}>
        <ConnectedRouter history={getHistory()}>
          <div>
            {stylesheets.map((s) => <link key={s} rel='stylesheet' href={s} />)}
            <Navigation />
            <div className='container'>
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
