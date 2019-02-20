import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import PlayerAvatar from 'modules/players/components/avatar'

import { COLOR_WHEEL } from 'constants/colors'
import { selectPlayerResults } from '../selectors'

const generateStyle = (player) => {
  const style = {}
  const { team } = player
  if (team) {
    style.borderLeft = `7px solid ${COLOR_WHEEL[team]}`
  }
  return style
}

class ScoreCard extends PureComponent {

  render() {
    const { player, results } = this.props

    return (
      <Panel
        player={player.id}
        className='score-card'
        style={generateStyle(player)}
      >
        <PlayerAvatar
          key={player.id}
          className='player-avatar'
          player={player}
          size='medium'
        />
        <div className='score-card-player-details'>
          <h4>{player.name}</h4>
          <div>
            Points: {results.points || 0}
          </div>
        </div>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    results: selectPlayerResults(state, props)
  }
}

ScoreCard.propTypes = {
  player: PropTypes.object.isRequired,
  matchId: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(ScoreCard)
