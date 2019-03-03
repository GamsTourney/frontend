import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel, Button, Glyphicon } from 'react-bootstrap'

import PlayerAvatar from 'modules/players/components/avatar'
import { COLOR_WHEEL } from 'constants/colors'
import { postScores } from '../actions'
import { selectPlayerResults } from '../selectors'

const generateStyle = (player) => {
  const style = {}
  const { team } = player
  if (team !== null) {
    style.borderLeft = `7px solid ${COLOR_WHEEL[team]}`
  }
  return style
}

class ScoreCard extends PureComponent {

  constructor(props) {
    super(props)
    this.handleAddPoint = this.handleAddPoint.bind(this)
  }

  handleAddPoint(points) {
    const { actions, matchId, player, results } = this.props
    const prevScore = results.points
    const { match_competitor_id } = player
    if (prevScore + points >= 0) {
      actions.postScores(matchId, [{ match_competitor_id, points: prevScore + points }])
    }
  }

  render() {
    const { player, results, showPointEditor } = this.props

    return (
      <Panel
        player={player.id}
        mc={player.match_competitor_id}
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
          <span className='player-name'>{player.name}</span>
          {
            showPointEditor ?
            <div className='point-editor'>
              <Button onClick={() => this.handleAddPoint(-1)} bsSize="small" bsStyle="danger">
                <Glyphicon glyph="minus" />
              </Button>
              <div className='point-editor-number'>{results.points || 0}</div>
              <Button onClick={() => this.handleAddPoint(1)} bsSize="small" bsStyle="success">
                <Glyphicon glyph="plus" />
              </Button>
            </div> :
            <div className='point-display'>Points: {results.points || 0}</div>
          }
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      postScores
    }, dispatch)
  }
}

ScoreCard.propTypes = {
  player: PropTypes.object.isRequired,
  matchId: PropTypes.string.isRequired,
  showPointEditor: PropTypes.bool
}

ScoreCard.defaultProps = {
  showPointEditor: false
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard)
