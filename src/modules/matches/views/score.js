import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlayers } from 'modules/players/actions'

import ScoreCard from '../components/score_card'
import { fetchMatch } from '../actions'
import {
  selectMatchId,
  selectMatch,
  selectMatchPlayers
} from '../selectors'
import '../styles.css'


const PlayerCards = ({ matchId, players }) => {
  return players.map(player => <ScoreCard key={player.id} matchId={matchId} player={player} />)
}

class MatchScore extends PureComponent {

  componentDidMount() {
    const { matchId } = this.props
    this.props.actions.fetchMatch(matchId)
    this.props.actions.fetchPlayers()
  }

  render() {
    const { matchId, players } = this.props

    return <div><PlayerCards matchId={matchId} players={players}/></div>
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
