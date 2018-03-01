import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { selectPlayersById } from 'modules/players/selectors'
import PlayerAvatar from 'modules/players/components/avatar'

const FRIENDLY_STAT_NAMES = {
  most_second_places: 'Most Second Places'
}

class TournamentStats extends PureComponent {

  render() {
    const { stats, players } = this.props

    return (
      <div>
        {
          Object.keys(stats).map((stat) => {
            const { player } = stats[stat]
            const playerData = players[player]
            return (
              <div key={stat}>
                <h6>{FRIENDLY_STAT_NAMES[stat]}</h6>
                <PlayerAvatar
                  key={playerData.id}
                  player={playerData}
                  size='medium'
                  circle
                />
              </div>
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
