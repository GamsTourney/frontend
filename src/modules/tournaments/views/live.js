import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { get } from 'lodash/object'

import { fetchPlayers } from 'modules/players/actions'
import { fetchGames } from 'modules/games/actions'
import { fetchMatches } from 'modules/matches/actions'
import MatchCard from 'modules/matches/components/match_card'
import { fetchTournament } from '../actions'
import {
  selectUpcomingMatches,
  selectTournamentStandingsForChart
} from '../selectors'
import TournamentStandings from '../components/standings'
import {chunk} from "lodash/array";

const REFRESH_INTERVAL = 10000

const MatchRow = ({ row }) => (
  row.map((match) => (
    <Col key={match.id} xs={6}>
      <MatchCard key={match.id} matchData={match} />
    </Col>
  ))
)

const MatchCards = ({ matches, columns = 2 }) => {
  const rows = chunk(matches, 2)
  return rows.map((row, idx) => (
    <Row key={idx}>
      <MatchRow row={row} />
    </Row>
  ))
}

class TournamentLive extends PureComponent {

  componentWillMount() {
    this.fetchMatchData()
    this.props.actions.fetchPlayers()
    this.props.actions.fetchGames()
  }

  fetchMatchData = () => {
    this.props.actions.fetchMatches(this.props.tournamentId)
    this.props.actions.fetchTournament(this.props.tournamentId)
    setTimeout(() => {
      this.fetchMatchData()
    }, REFRESH_INTERVAL)
  }

  render() {
    const { standings, upcomingMatches } = this.props

    return (
      <Grid>
        <Row>
          <Col md={7}>
            <Panel bsStyle='primary'>
              <Panel.Heading>Standings</Panel.Heading>
              <Panel.Body><TournamentStandings standings={standings} /></Panel.Body>
            </Panel>
          </Col>
          <Col md={5}>
            <Panel bsStyle='primary'>
              <Panel.Heading>Up Next</Panel.Heading>
              <Panel.Body><MatchCards matches={upcomingMatches} /></Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Panel bsStyle='primary'>
              <Panel.Heading>Other Stats</Panel.Heading>
              <Panel.Body>TODO</Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

TournamentLive.propTypes = {
  tournamentId: PropTypes.string.isRequired,
  standings: PropTypes.array.isRequired
}


function mapStateToProps(state, props) {
  const tournamentId = get(props, 'match.params.id') || '1'

  return {
    tournamentId,
    standings: selectTournamentStandingsForChart(state, { tournamentId }),
    upcomingMatches: selectUpcomingMatches(state, { tournamentId })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchTournament,
      fetchPlayers,
      fetchGames,
      fetchMatches
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentLive)
