import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

import { selectPlayersById } from 'modules/players/selectors'
import PlayerAvatar from 'modules/players/components/avatar'

const FRIENDLY_STAT_NAMES = {
  longest_streak: 'Hot Streak',
  point_grabber: 'Point Snatcher',
  most_disappointing: 'Most Disappointing'
}

class TournamentStats extends PureComponent {

  render() {
    const { stats, players } = this.props

    return (
      <div>
        {
          Object.keys(stats).map((stat, idx) => {
            const { player, value, game } = stats[stat]
            const playerData = players[player]

            return (
              <Col className='stat-container' md={4} xs={6} key={stat}>
                <h6>{FRIENDLY_STAT_NAMES[stat]}</h6>
                <PlayerAvatar
                  key={idx}
                  player={playerData}
                  size='medium'
                  circle
                />
                <br />
                <span>Value: {value}</span>
                {
                  game &&
                  <span><br />{game.name}</span>
                }
              </Col>
            )
          })
        }
      </div>
    )
  }
}

TournamentStats.propTypes = {
  stats: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    players: selectPlayersById(state)
  }
}

export default connect(mapStateToProps)(TournamentStats)
