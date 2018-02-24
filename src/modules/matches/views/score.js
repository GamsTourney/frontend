import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchPlayers } from 'modules/players/actions'
import { fetchMatch } from '../actions'
import {
  selectMatchId,
  selectMatch,
  selectMatchPlayers
} from '../selectors'

class MatchScore extends PureComponent {

  componentDidMount() {
    const { matchId } = this.props
    this.props.actions.fetchMatch(matchId)
    this.props.actions.fetchPlayers()
  }

  render() {
    const { matchData } = this.props

    return <div>{matchData.id}</div>
  }
}

MatchScore.propTypes = {
  actions: PropTypes.object.isRequired,
  matchData: PropTypes.object
}

MatchScore.defaultProps = {
  matchData: null
}

function mapStateToProps(state, props) {
  return {
    matchId: selectMatchId(state, props),
    matchData: selectMatch(state, props),
    players: selectMatchPlayers(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchMatch,
      fetchPlayers
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchScore)
