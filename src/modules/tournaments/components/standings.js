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
import { COLOR_WHEEL } from 'constants/colors'

const RainbowBar = (props) => {
  const { index } = props
  return <Rectangle {...props} fill={COLOR_WHEEL[index]} />
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
