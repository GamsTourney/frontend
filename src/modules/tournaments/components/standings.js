import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle
} from 'recharts'

import { fetchPlayers } from 'modules/players/actions'
import { fetchTournament } from '../actions'
import { selectTournamentStandingsForChart } from '../selectors'

const COLORS = [
  '#396AB1',
  '#DA7C30',
  '#3E9651',
  '#ef9a9a',
  '#535154',
  '#6B4C9A',
  '#922428',
  '#FBC02D'
]

const RainbowBar = (props) => {
  const { index } = props
  return <Rectangle {...props} fill={COLORS[index]} />
}

class TournamentStandings extends PureComponent {

  componentWillMount() {
    this.props.actions.fetchPlayers()
    this.props.actions.fetchTournament(this.props.tournamentId)
  }

  render() {
    const { standings } = this.props

    return (
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={standings} layout='vertical'>
          <YAxis type='category' dataKey='name'/>
          <XAxis type='number' />
          <Tooltip/>
          <Bar shape={RainbowBar} dataKey='score' fill="#8884d8"/>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

TournamentStandings.propTypes = {
  tournamentId: PropTypes.string.isRequired,
  standings: PropTypes.array.isRequired
}

function mapStateToProps(state, props) {
  return {
    standings: selectTournamentStandingsForChart(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchTournament,
      fetchPlayers
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentStandings)
