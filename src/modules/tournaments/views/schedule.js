import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Chart } from 'react-google-charts'
import { Panel, Glyphicon } from 'react-bootstrap'

import { fetchMatches, fetchMatchCompetitorsForTournament } from 'modules/matches/actions'
import { fetchPlayers } from 'modules/players/actions'
import { fetchGames } from 'modules/games/actions'
import { selectTournamentId } from 'modules/tournaments/selectors'
import { selectTimelineData } from '../selectors'

class TournamentSchedule extends PureComponent {

  componentWillMount() {
    const { tournamentId } = this.props
    this.props.actions.fetchMatches(tournamentId)
    this.props.actions.fetchMatchCompetitorsForTournament(tournamentId)
    this.props.actions.fetchGames(tournamentId)
    this.props.actions.fetchPlayers(tournamentId)
  }

  render() {
    const { timelineData } = this.props

    if (timelineData.length === 0) {
      return null
    }

    return (
      <Panel bsStyle='primary'>
        <Panel.Heading>
          <Glyphicon glyph="calendar" /> Tournament Schedule
        </Panel.Heading>
        <Panel.Body>
          <Chart
            chartType="Timeline"
            columns = {[
              { id: 'Player', type: 'string' },
              { id: 'Game', type: 'string' },
              { id: 'Start', type: 'date' },
              { id: 'End', type: 'date' }
            ]}
            options={{
              timeline: {
                showBarLabels: false
              },
              hAxis: {
                format: 'h:mm'
              }
            }}
            rows={timelineData}
            graph_id='tournament-schedule'
            width='100%'
            height='400px'
          />
        </Panel.Body>

      </Panel>
    )
  }
}

TournamentSchedule.propTypes = {
  actions: PropTypes.object.isRequired,
  tournamentId: PropTypes.number.isRequired,
  timelineData: PropTypes.array
}

TournamentSchedule.defaultProps = {
  timelineData: []
}

function mapStateToProps(state, props) {
  return {
    tournamentId: selectTournamentId(state, props),
    timelineData: selectTimelineData(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPlayers,
      fetchGames,
      fetchMatches,
      fetchMatchCompetitorsForTournament
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentSchedule)
