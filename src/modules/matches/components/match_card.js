import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import PlayerAvatar from 'modules/players/components/avatar'
import { selectMatchPlayers } from '../selectors'

class MatchCard extends PureComponent {

  render() {
    const { matchData } = this.props
    const { game } = matchData

    return (
      <Panel className='match-card'>
        <LinkContainer style={{ cursor: 'pointer' }} to={`/matches/${matchData.id}/score`}>
          <Panel.Body>
            <h6 style={{ marginTop: '0px' }}>{game.name}</h6>
            {
              this.props.players.map((player) => (
                <PlayerAvatar
                  key={player.id}
                  player={player}
                  size='small'
                  style={{
                    width: '35px',
                    marginRight: '6px',
                    marginBottom: '6px'
                  }}
                  circle
                />
              ))
            }
          </Panel.Body>
        </LinkContainer>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    players: selectMatchPlayers(state, { matchId: props.matchData.id })
  }
}

MatchCard.propTypes = {
  players: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(MatchCard)
