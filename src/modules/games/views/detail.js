import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash/object'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import { Row, Col, Panel, FormGroup, Checkbox } from 'react-bootstrap'

import GameCard from '../components/card'
import MatchCard from 'modules/matches/components/match_card'
import { fetchPlayers } from 'modules/players/actions'
import { fetchMatchCompetitorsForTournament } from 'modules/matches/actions'
import {
  selectFilteredMatchesForGame,
  selectGame,
  selectMatchesForGame
} from '../selectors'
import { clearGroupFilter, fetchGame, fetchMatchesForGame, updateGroupFilter } from '../actions'
import { chunk } from "lodash/array"

import '../styles.css'

const MatchRow = ({ row }) => (
  row.map((match) => (
    <Col key={match.id} sm={4} xs={12}>
      <MatchCard
        key={match.id}
        matchData={match}
        displayAttribute='start_time'
      />
    </Col>
  ))
)

const MatchCards = ({ matches, columns = 3 }) => {
  const rows = chunk(matches, 3)
  return rows.map((row, idx) => (
    <Row key={idx}>
      <MatchRow row={row} />
    </Row>
  ))
}

const GroupCheckbox = ({ gameId, groupId, onClick }) => {
  return (
    <Checkbox
      inline
      style={{ paddingRight: '10px' }}
      onClick={(e) => onClick(gameId, groupId, e.target.checked)}
    >
      Group {groupId + 1}
    </Checkbox>
  )
}

class GameDetail extends PureComponent {

  componentDidMount() {
    window.scrollTo(0, 0)
    const { gameId, tournamentId } = this.props
    this.props.actions.fetchGame(gameId)
    this.props.actions.fetchMatchesForGame(tournamentId, gameId)
    this.props.actions.fetchMatchCompetitorsForTournament(tournamentId)
    this.props.actions.fetchPlayers(tournamentId)
  }

  render() {
    const {
      actions,
      game,
      groupIds,
      matches,
      tournamentId
    } = this.props

    if(!game) {
      return null
    }

    return (
      <Fragment>
        <GameCard tournamentId={tournamentId} game={game} />
        <Panel bsStyle="primary">
          <Panel.Heading>Matches</Panel.Heading>
          <Panel.Body>
            <FormGroup className='group-filter-checkboxes'>
              { groupIds.length > 1 && groupIds.map((groupId) =>
                <GroupCheckbox
                  key={groupId}
                  gameId={game.id}
                  groupId={groupId}
                  onClick={actions.updateGroupFilter}
                />
              )}
            </FormGroup>
            <MatchCards matches={matches} />
          </Panel.Body>
        </Panel>
      </Fragment>
    )

  }
}

GameDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  tournamentId: PropTypes.number.isRequired,
  game: PropTypes.object,
  matches: PropTypes.array.isRequired,
  groupIds: PropTypes.array.isRequired
}

GameDetail.defaultProps = {
  game: null
}

function mapStateToProps(state, props) {
  const gameId = Number(get(props, 'match.params.id'))
  const tournamentId = Number(get(props, 'match.params.tournamentId'))
  const matches = selectMatchesForGame(state, props)

  return {
    tournamentId,
    gameId,
    matches: selectFilteredMatchesForGame(state, props),
    game: selectGame(state, props),
    groupIds: uniq(map(matches, 'group_id'))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchGame,
      fetchMatchesForGame,
      fetchMatchCompetitorsForTournament,
      fetchPlayers,
      updateGroupFilter,
      clearGroupFilter
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail)
