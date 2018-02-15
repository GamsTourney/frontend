import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash/object'

import GameCard from '../components/card'
import { fetchGame } from '../actions'
import '../styles.css'

class GameDetail extends PureComponent {

  componentDidMount() {
    this.props.actions.fetchGame(this.props.gameId)
  }

  render() {
    const { game } = this.props

    if(!game) {
      return null
    }

    return <GameCard game={game} />
  }
}

GameDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object
}

GameDetail.defaultProps = {
  game: null
}

function mapStateToProps(state, props) {
  const gameId = Number(get(props, 'match.params.id'))

  return {
    gameId,
    game: state.games[gameId]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchGame
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail)
