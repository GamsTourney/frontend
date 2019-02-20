import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter, find, keyBy, orderBy, map } from 'lodash/collection'
import { selectMatches, selectMatchCompetitors, selectPlayers } from 'selectors/collections'

const selectMatchId = (state, props) => get(props, 'match.params.id') || props.matchId
const selectPlayerId = (state, props) => get(props, 'player.id')

const selectMatch = createSelector(
  selectMatches,
  selectMatchId,
  (matches, matchId) => matches[matchId] || {}
)

const selectMatchPlayers = createSelector(
  selectMatchId,
  selectMatchCompetitors,
  selectPlayers,
  (matchId, matchCompetitors, players) => {
    const competitors = filter(matchCompetitors, rc => Number(rc.match_id) === Number(matchId))
    return competitors.map(mc => players[mc.player_id])
  }
)

const selectMatchResults = createSelector(
  selectMatch,
  (match) => match.results
)

const selectPlayerResults = createSelector(
  selectMatchResults,
  selectPlayerId,
  (results, playerId) => find(results, result => result.player_id === playerId) || {}
)

const selectMatchPlayersWithResults = createSelector(
  selectMatchPlayers,
  selectMatchResults,
  (players, results) => {
    const playerResults = keyBy(results, 'player_id')
    players.forEach(player => player.results = playerResults[player.id] || {})
    return orderBy(players, player => player.results.position)
  }
)

const selectMatchPlayerOrder = createSelector(
  selectMatchPlayersWithResults,
  players => map(players, player => `${player.id}`)
)

export {
  selectMatchId,
  selectMatch,
  selectMatchPlayers,
  selectPlayerResults,
  selectMatchPlayersWithResults,
  selectMatchPlayerOrder
}
