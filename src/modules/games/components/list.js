import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { values } from 'lodash/object'
import { chunk } from 'lodash/array'
import { Grid, Col, Row } from 'react-bootstrap'

import GameCard from '../components/card'
import { selectGames } from 'selectors/collections'
import { fetchGames } from '../actions'

const GameRow = ({ row }) => (
  row.map((game) => (
    <Col key={game.id} md={6} xs={12}>
      <GameCard style={{ height: '100%' }} game={game}/>
    </Col>
  ))
)

const GameCards = ({ games, columns = 2 }) => {
  const rows = chunk(games, 2)
  return rows.map((row, idx) => <Row key={idx}><GameRow row={row}/></Row>)
}

class GameList extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchGames()
  }

  render() {
    const { games } = this.props

    if (games.length <= 0) {
      return null
    }

    return (
      <Grid><GameCards games={games} /></Grid>
    )
  }
}

GameList.propTypes = {
  actions: PropTypes.object.isRequired,
  games: PropTypes.array
}

GameList.defaultProps = {
  games: []
}

function mapStateToProps(state) {
  return {
    games: values(selectGames(state))
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
