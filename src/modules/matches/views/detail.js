import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash/object'

import { fetchMatch } from '../actions'

class MatchDetail extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchMatch(this.props.matchId)
  }

  render() {
    const { match } = this.props

    if(!match) {
      return null
    }

    return <div>{match.id}</div>
  }
}

MatchDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  match: PropTypes.object
}

MatchDetail.defaultProps = {
  match: null
}

function mapStateToProps(state, props) {
  const matchId = Number(get(props, 'match.params.id'))

  return {
    matchId,
    match: state.matches[matchId]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchMatch
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetail)
