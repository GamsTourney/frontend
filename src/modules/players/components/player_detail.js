import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash/object'
import { Grid, Row, Col, Panel } from 'react-bootstrap'

import { fetchPlayer } from '../actions'
import PlayerAvatar from './player_avatar'

class PlayerDetail extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchPlayer(this.props.playerId)
  }

  render() {
    const { player } = this.props

    if(!player) {
      return null
    }

    return (
      <Grid>
        <Row>
          <Col xs={4}>
            <Panel>
              <Panel.Heading>{player.name} Details</Panel.Heading>
              <PlayerAvatar
                className='player-avatar'
                player={player}
                rounded
              />
              <Panel.Body>User info goes here</Panel.Body>
            </Panel>
          </Col>
          <Col xs={8}>
            <Panel>
              <Panel.Heading>Stats</Panel.Heading>
              <Panel.Body>STATS HERE</Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Panel>
              <Panel.Heading>Charts and Shit</Panel.Heading>
              <Panel.Body>Charts</Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

PlayerDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  player: PropTypes.object
}

PlayerDetail.defaultProps = {
  player: null
}

function mapStateToProps(state, props) {
  const playerId = Number(get(props, 'match.params.id'))

  return {
    playerId,
    player: state.players[playerId]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPlayer
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetail)
