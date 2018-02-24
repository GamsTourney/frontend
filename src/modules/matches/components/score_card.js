import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Panel, Row, Col } from 'react-bootstrap'
import PlayerAvatar from 'modules/players/components/avatar'

import { selectPlayerResults } from '../selectors'

class ScoreCard extends PureComponent {

  render() {
    const { player, results } = this.props
    console.log(this.props)

    return (
      <Panel className='score-card'>
        <Row>
          <Col xs={1}>
            <PlayerAvatar
              key={player.id}
              className='player-avatar'
              player={player}
              size='medium'
            />
          </Col>
          <Col xs={11}>
            <h4>{player.name}</h4>
            <div>
              Points: {results.points}
            </div>
          </Col>
        </Row>
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
