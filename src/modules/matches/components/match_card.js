import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'
import maxBy from 'lodash/maxBy'
import get from 'lodash/get'

import PlayerAvatar from 'modules/players/components/avatar'
import { selectMatchPlayersWithResults } from '../selectors'
import { COLOR_WHEEL } from 'constants/colors'

const generateBorderStyle = (player) => {
  let border
  if (player.team !== null) {
    border = `3px solid ${COLOR_WHEEL[player.team]}`
  }
  console.log(border)
  return border
}

class MatchCard extends PureComponent {

  renderHeader() {
    const { matchData, displayAttribute } = this.props
    const { game, group_id: groupId } = matchData

    switch(displayAttribute) {
      case 'game.name':
        return game.name
      case 'start_time':
        let timestamp = moment(matchData.start_time).format('h:mm A')
        if (groupId !== null) {
          timestamp += ` (Group ${groupId + 1})`
        }
        return timestamp
      default:
        return matchData[displayAttribute]
    }
  }

  render() {
    const { matchData, players } = this.props
    const className = matchData.completed ? 'match-card-completed' : 'match-card'
    const topPlayer = maxBy(players, (p) => get(p, 'results.points'))

    return (
      <Panel className={className}>
        <LinkContainer style={{ cursor: 'pointer' }} to={`/matches/${matchData.id}/score`}>
          <Panel.Body>
            <h6 style={{ marginTop: '0px' }}>{this.renderHeader()}</h6>
            {
              players.map((player, idx) => {
                if (!player.id) { return null }
                const points = get(player, 'results.points')
                const topPoints = get(topPlayer, 'results.points')
                const winner = points === topPoints && matchData.completed
                return (
                  <PlayerAvatar
                    key={player.id}
                    player={player}
                    size='small'
                    style={{
                      width: '35px',
                      marginRight: '6px',
                      marginBottom: '6px',
                      border: generateBorderStyle(player)
                    }}
                    circle
                    winner={winner ? 'true' : undefined}
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
