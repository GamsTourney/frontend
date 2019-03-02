import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import { selectTournamentId } from 'modules/tournaments/selectors'
import { selectGameScoreRankList } from 'modules/games/selectors'
import { fetchPlayers } from 'modules/players/actions'
import { fetchGameScores } from 'modules/games/actions'

import ScoreCard from '../score_card'
import {
  fetchMatch,
  fetchMatchCompetitors,
  postScores
} from '../../actions'
import {
  selectMatchPlayersWithResults,
  selectMatchComepetitorOrder
} from '../../selectors'
import '../../styles.css'

const PlayerCards = ({ matchId, players }) => {
  if (!get(players, '0.id')) { return null }
  return players.map(player => (
    <ScoreCard
      key={player.id}
      matchId={`${matchId}`}
      player={player}
      showPointEditor
    />
  ))
}

class MatchManualScore extends PureComponent {

  componentDidMount() {
    const { match, tournamentId } = this.props
    this.props.actions.fetchMatchCompetitors(match.id)
    this.props.actions.fetchPlayers(tournamentId)
    this.props.actions.fetchGameScores(match.game_id)
  }

  render() {
    const { tournamentId, match, players } = this.props
    const game = match.game || {}

    return (
      <div>
        <Link to={`/tournaments/${tournamentId}/games/${game.id}`}>
          <h4>{game.name}</h4>
        </Link>
        <PlayerCards matchId={match.id} players={players}/>
      </div>
    )
  }
}

MatchManualScore.propTypes = {
  actions: PropTypes.object.isRequired,
  tournamentId: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  order: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired
}

function mapStateToProps(state, props) {
  const { match } = props

  return {
    tournamentId: selectTournamentId(state),
    players: selectMatchPlayersWithResults(state, { matchId: match.id }),
    order: selectMatchComepetitorOrder(state, { matchId: match.id }),
    scores: selectGameScoreRankList(state, { gameId: match.game_id })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchMatch,
      fetchMatchCompetitors,
      fetchPlayers,
      fetchGameScores,
      postScores
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchManualScore)
