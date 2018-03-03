import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect, Route, withRouter } from 'react-router'
import { connect } from 'react-redux'

class PrivateRoute extends Component {

  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Route {...rest} render={(props) => (
          this.props.password === process.env.ADMIN_PASSWORD
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )} />
    )
  }
}

PrivateRoute.propTypes = {
  password: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    password: state.login.password
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
