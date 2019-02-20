import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { chunk } from 'lodash/array'
import { Grid, Col, Row } from 'react-bootstrap'

import { selectTournamentId } from 'modules/tournaments/selectors'
import { selectGamesForTournament } from '../selectors'
import GameCard from '../components/card'
import { fetchGames } from '../actions'


const GameRow = ({ tournamentId, row }) => (
  row.map((game) => (
    <Col key={game.id} md={6} xs={12}>
      <GameCard
        style={{ height: '100%' }}
        tournamentId={tournamentId}
        game={game}
      />
    </Col>
  ))
)

const GameCards = ({ tournamentId, games, columns = 2 }) => {
  const rows = chunk(games, 2)
  return rows.map((row, idx) => (
    <Row key={idx}>
      <GameRow tournamentId={tournamentId} row={row}/>
    </Row>
  ))
}

class GameList extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchGames(this.props.tournamentId)
  }

  render() {
    const { games, tournamentId } = this.props

    if (games.length <= 0) {
      return null
    }

    return (
      <Grid><GameCards tournamentId={tournamentId} games={games} /></Grid>
    )
  }
}

GameList.propTypes = {
  actions: PropTypes.object.isRequired,
  tournamentId: PropTypes.number.isRequired,
  games: PropTypes.array
}

GameList.defaultProps = {
  games: []
}

function mapStateToProps(state) {
  const tournamentId = selectTournamentId(state)

  return {
    tournamentId,
    games: selectGamesForTournament(state, { tournamentId })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchGames
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList)
