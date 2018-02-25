import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash/object'
import { Chart } from 'react-google-charts'
import { Panel } from 'react-bootstrap'

import { selectTimelineData } from '../selectors'
import { fetchMatches } from 'modules/matches/actions'
import { fetchPlayers } from 'modules/players/actions'
import { fetchGames } from 'modules/games/actions'

class TournamentSchedule extends PureComponent {

  componentWillMount() {
    this.props.actions.fetchMatches(this.props.tournamentId)
    this.props.actions.fetchGames()
    this.props.actions.fetchPlayers()
  }

  render() {
    const { timelineData } = this.props

    if (timelineData.length === 0) {
      return null
    }

    return (
      <Panel bsStyle='primary'>
        <Panel.Heading>
          Tournament Schedule
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
  timelineData: PropTypes.array
}

TournamentSchedule.defaultProps = {
  timelineData: []
}

function mapStateToProps(state, props) {
  const tournamentId = get(props, 'match.params.id')

  return {
    tournamentId,
    timelineData: selectTimelineData(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchMatches,
      fetchPlayers,
      fetchGames
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentSchedule)
