import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import isEmpty from 'lodash/isEmpty'

class GameScores extends PureComponent {

  render() {
    const { game } = this.props
    const scores = game.scores || []

    return (
      isEmpty(scores) ?
      'Manual' :
      <ButtonGroup
        className='score-list'
        bsSize='xsmall'
      >
        {scores.map((score) => <Button key={score.id}>{score.value}</Button>)}
      </ButtonGroup>
    )
  }
}

GameScores.propTypes = {
  game: PropTypes.object
}

GameScores.defaultProps = {
  game: null
}

export default GameScores
