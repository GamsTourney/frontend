import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Col, Row, Panel, Image } from 'react-bootstrap'

import GameScores from './scores'

class GameCard extends PureComponent {

  render() {
    const { game, tournamentId } = this.props

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>{game.name}</Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={12} md={7}>
                <LinkContainer to={`/tournaments/${tournamentId}/games/${game.id}`}>
                  <Image className='game-avatar' src={game.img_url} />
                </LinkContainer>
              </Col>
              <Col xs={12} md={5}>
                <div>Players: {game.players}</div>
                <div>Scoring: <GameScores game={game} /></div>
              </Col>
            </Row>
          </Panel.Body>
      </Panel>
    )
  }
}

GameCard.propTypes = {
  game: PropTypes.object,
  tournamentId: PropTypes.number.isRequired
}

GameCard.defaultProps = {
  game: null
}

export default GameCard
