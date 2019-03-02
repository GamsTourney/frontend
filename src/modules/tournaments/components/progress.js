import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { ProgressBar } from 'react-bootstrap'

// TODO: Gams 2019 specific data up in here
const start = new Date('2019-03-9T15:00:00.000Z').getTime()
const end = new Date('2018-03-11T00:00:00.000Z').getTime()
const now = new Date().getTime()

class TournamentProgress extends PureComponent {

  render() {
    const { progressData } = this.props

    return (
      <div>
        <h6>Match Progress</h6>
        <ProgressBar now={progressData.matchProgress} />
        <h6>Time Progress</h6>
        <ProgressBar min={start} max={end} now={now} />
        <h6>Player Saltiness</h6>
        <ProgressBar min={start} max={end} now={now + 4050000} />
      </div>
    )
  }
}

TournamentProgress.propTypes = {
  progressData: PropTypes.shape({
    matchProgress: PropTypes.Number
  })
}

TournamentProgress.defaultProps = {
  progressData: {
    matchProgress: 0
  }
}

export default TournamentProgress
