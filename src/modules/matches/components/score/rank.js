import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Sortable from 'react-sortablejs'
import { Button } from 'react-bootstrap'
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
    <ScoreCard key={player.id} matchId={`${matchId}`} player={player} />
  ))
}

class MatchRankScore extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      order: null
    }
    this.onChangeOrder = this.onChangeOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { match, tournamentId } = this.props
    this.props.actions.fetchMatchCompetitors(match.id)
    this.props.actions.fetchPlayers(tournamentId)
    this.props.actions.fetchGameScores(match.game_id)
  }

  onChangeOrder(order, sortable, event) {
    this.setState({ order })
    sortable.sort(order)
  }

  handleSubmit() {
    const { match, scores } = this.props
    const order = this.state.order || this.props.order
    const scoreData = order.map((mc_id, idx) => ({
      match_competitor_id: mc_id,
      points: scores[idx],
      position: idx
    }))
    this.props.actions.postScores(match.id, scoreData)
  }

  render() {
    const { tournamentId, match, players } = this.props
    const game = match.game || {}

    return (
      <div className='score-sorter'>
        <Link to={`/tournaments/${tournamentId}/games/${game.id}`}>
          <h4>{game.name}</h4>
        </Link>
        <Sortable
          onChange={this.onChangeOrder}
          options={{ dataIdAttr: 'mc' }}
        >
          <PlayerCards matchId={match.id} players={players}/>
        </Sortable>
        <Button
          type='submit'
          bsStyle={ match.completed ? 'success' : 'primary' }
          className='pull-right'
          onClick={this.handleSubmit}
        >
          { match.completed ? 'Update' : 'Submit' }
        </Button>
      </div>
    )
  }
}

MatchRankScore.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchRankScore)
