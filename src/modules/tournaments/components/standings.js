import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle
} from 'recharts'

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

  render() {
    const { standings } = this.props

    return (
      <ResponsiveContainer width='100%' height={340}>
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
  standings: PropTypes.array.isRequired
}

export default TournamentStandings
