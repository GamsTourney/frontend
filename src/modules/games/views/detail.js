import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash/object'
import { Row, Col, Panel } from 'react-bootstrap'

import GameCard from '../components/card'
import MatchCard from 'modules/matches/components/match_card'
import { fetchPlayers } from 'modules/players/actions'
import { selectGame, selectMatchesForGame } from '../selectors'
import { fetchGame, fetchMatchesForGame } from '../actions'
import '../styles.css'
import {chunk} from "lodash/array";

const MatchRow = ({ row }) => (
  row.map((match) => (
    <Col key={match.id} sm={4} xs={12}>
      <MatchCard
        key={match.id}
        matchData={match}
        displayAttribute='start_time'
      />
    </Col>
  ))
)

const MatchCards = ({ matches, columns = 3 }) => {
  const rows = chunk(matches, 3)
  return rows.map((row, idx) => (
    <Row key={idx}>
      <MatchRow row={row} />
    </Row>
  ))
}

class GameDetail extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchGame(this.props.gameId)
    this.props.actions.fetchMatchesForGame(this.props.gameId)
    this.props.actions.fetchPlayers()
  }

  render() {
    const { game, matches } = this.props
    console.log(this.props)

    if(!game) {
      return null
    }

    return (
      <Fragment>
        <GameCard game={game} />
        <Panel bsStyle="primary">
          <Panel.Heading>Matches</Panel.Heading>
          <Panel.Body>
            <MatchCards matches={matches} />
          </Panel.Body>
        </Panel>
      </Fragment>
    )

  }
}

GameDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object,
  matches: PropTypes.array.isRequired
}

GameDetail.defaultProps = {
  game: null
}

function mapStateToProps(state, props) {
  const gameId = Number(get(props, 'match.params.id'))

  return {
    gameId,
    game: selectGame(state, props),
    matches: selectMatchesForGame(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchGame,
      fetchMatchesForGame,
      fetchPlayers
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail)
