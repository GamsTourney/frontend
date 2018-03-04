import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'

import PlayerAvatar from 'modules/players/components/avatar'
import { selectMatchPlayersWithResults } from '../selectors'

class MatchCard extends PureComponent {

  renderHeader() {
    const { matchData, displayAttribute } = this.props
    const { game } = matchData

    switch(displayAttribute) {
      case 'game.name':
        return game.name
      case 'start_time':
        return moment(matchData.start_time).format('h:mm A')
      default:
        return matchData[displayAttribute]
    }
  }

  render() {
    const { matchData } = this.props
    const className = matchData.completed ? 'match-card-completed' : 'match-card'

    return (
      <Panel className={className}>
        <LinkContainer style={{ cursor: 'pointer' }} to={`/matches/${matchData.id}/score`}>
          <Panel.Body>
            <h6 style={{ marginTop: '0px' }}>{this.renderHeader()}</h6>
            {
              this.props.players.map((player, idx) => {
                const winner = idx === 0 && matchData.completed
                return (
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
                    winner={winner}
                  />
                )
              })
            }
          </Panel.Body>
        </LinkContainer>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    players: selectMatchPlayersWithResults(state, { matchId: props.matchData.id })
  }
}

MatchCard.propTypes = {
  players: PropTypes.array.isRequired,
  displayAttribute: PropTypes.string
}

MatchCard.defaultProps = {
  displayAttribute: 'game.name'
}

export default connect(mapStateToProps)(MatchCard)
