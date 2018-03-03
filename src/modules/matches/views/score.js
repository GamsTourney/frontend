import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sortable from 'react-sortablejs'
import { fetchPlayers } from 'modules/players/actions'

import ScoreCard from '../components/score_card'
import { fetchMatch, postScores } from '../actions'
import {
  selectMatchId,
  selectMatch,
  selectMatchPlayersWithResults,
  selectMatchPlayerOrder
} from '../selectors'
import { Button } from 'react-bootstrap'
import '../styles.css'

const PlayerCards = ({ matchId, players }) => {
  return players.map(player => (
    <ScoreCard key={player.id} matchId={matchId} player={player} />
  ))
}

class MatchScore extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      order: null
    }
    this.onChangeOrder = this.onChangeOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { matchId } = this.props
    this.props.actions.fetchMatch(matchId)
    this.props.actions.fetchPlayers()
  }

  onChangeOrder(order, sortable, event) {
    this.setState({ order })
    sortable.sort(order)
  }

  handleSubmit() {
    const { matchId } = this.props
    const order = this.state.order || this.props.order
    this.props.actions.postScores(matchId, order)
  }

  render() {
    const { matchId, matchData, players } = this.props
    const game = matchData.game || {}

    return (
      <div className='score-sorter'>
        <h4>{game.name}</h4>
        <Sortable
          onChange={this.onChangeOrder}
          options={{
            dataIdAttr: 'player'
          }}
        >
          <PlayerCards matchId={matchId} players={players}/>
        </Sortable>
        <Button
          type='submit'
          bsStyle={ matchData.completed ? 'success' : 'primary' }
          className='pull-right'
          onClick={this.handleSubmit}
        >
          { matchData.completed ? 'Update' : 'Submit' }
        </Button>
      </div>
    )
  }
}

MatchScore.propTypes = {
  actions: PropTypes.object.isRequired,
  matchData: PropTypes.object,
  players: PropTypes.array.isRequired,
  order: PropTypes.array.isRequired
}

MatchScore.defaultProps = {
  matchData: null
}

function mapStateToProps(state, props) {
  return {
    matchId: selectMatchId(state, props),
    matchData: selectMatch(state, props),
    players: selectMatchPlayersWithResults(state, props),
    order: selectMatchPlayerOrder(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchMatch,
      fetchPlayers,
      postScores
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchScore)
