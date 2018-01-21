import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlayer } from '../actions'
import { get } from 'lodash/object'

class PlayerDetail extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchPlayer(this.props.playerId)
  }

  render() {
    const { player } = this.props

    if(!player) {
      return null
    }

    return <div>{player.name}</div>
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
