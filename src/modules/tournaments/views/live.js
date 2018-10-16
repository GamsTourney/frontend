import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel, Glyphicon } from 'react-bootstrap'
import { chunk } from 'lodash/array'

import { fetchPlayers } from 'modules/players/actions'
import { fetchGames } from 'modules/games/actions'
import { fetchMatches } from 'modules/matches/actions'
import MatchCard from 'modules/matches/components/match_card'
import { fetchTournament } from '../actions'
import {
  selectTournamentId,
  selectUpcomingMatches,
  selectTournamentStandingsForChart,
  selectProgressData,
  selectTournamentStats
} from '../selectors'
import TournamentStandings from '../components/standings'
import TournamentProgress from '../components/progress'
import TournamentStats from '../components/stats'
import '../styles.css'

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
    this.props.actions.fetchPlayers(this.props.tournamentId)
    this.props.actions.fetchGames(this.props.tournamentId)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  fetchMatchData = () => {
    this.props.actions.fetchMatches(this.props.tournamentId)
    this.props.actions.fetchTournament(this.props.tournamentId)
    this.timeout = setTimeout(() => {
      this.fetchMatchData()
    }, REFRESH_INTERVAL)
  }

  render() {
    const { standings, progressData, upcomingMatches, stats } = this.props

    return (
      <Grid>
        <Row>
          <Col md={7}>
            <Panel bsStyle='primary'>
              <Panel.Heading>
                <Glyphicon glyph="stats" /> Standings
              </Panel.Heading>
              <Panel.Body><TournamentStandings standings={standings} /></Panel.Body>
            </Panel>
          </Col>
          <Col md={5}>
            <Panel bsStyle='primary'>
              <Panel.Heading>
                <Glyphicon glyph="calendar" /> Up Next
              </Panel.Heading>
              <Panel.Body><MatchCards matches={upcomingMatches} /></Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Panel bsStyle='primary'>
              <Panel.Heading>
                <Glyphicon glyph="play" /> Progress
              </Panel.Heading>
              <Panel.Body><TournamentProgress progressData={progressData} /></Panel.Body>
            </Panel>
          </Col>
          <Col md={7}>
            <Panel bsStyle='primary'>
              <Panel.Heading>
                <Glyphicon glyph="glass" /> Awards
              </Panel.Heading>
              <Panel.Body><TournamentStats stats={stats} /></Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

TournamentLive.propTypes = {
  tournamentId: PropTypes.number.isRequired,
  standings: PropTypes.array.isRequired
}


function mapStateToProps(state, props) {
  const tournamentId = selectTournamentId(state)

  return {
    tournamentId,
    standings: selectTournamentStandingsForChart(state, { tournamentId }),
    upcomingMatches: selectUpcomingMatches(state, { tournamentId }),
    progressData: selectProgressData(state, { tournamentId }),
    stats: selectTournamentStats(state, { tournamentId })
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
