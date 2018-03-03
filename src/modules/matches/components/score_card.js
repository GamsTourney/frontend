import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import PlayerAvatar from 'modules/players/components/avatar'

import { selectPlayerResults } from '../selectors'

class ScoreCard extends PureComponent {

  render() {
    const { player, results } = this.props

    return (
      <Panel player={player.id} className='score-card'>
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
