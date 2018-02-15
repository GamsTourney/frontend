import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class GameCard extends PureComponent {

  render() {
    const { game } = this.props

    return <div>{this.props.game.name}</div>
  }
}

GameCard.propTypes = {
  game: PropTypes.object
}

GameCard.defaultProps = {
  game: null
}

export default GameCard
