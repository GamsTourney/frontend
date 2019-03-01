import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter, find, keyBy, orderBy, map, some } from 'lodash/collection'
import { selectMatches, selectMatchCompetitors, selectPlayers } from 'selectors/collections'

const selectMatchId = (state, props) => get(props, 'match.params.id') || props.matchId
const selectPlayerId = (state, props) => get(props, 'player.id')

const selectMatch = createSelector(
  selectMatches,
  selectMatchId,
  (matches, matchId) => matches[matchId] || {}
)

const selectMatchMatchCompetitors = createSelector(
  selectMatchId,
  selectMatchCompetitors,
  (matchId, matchCompetitors) => filter(matchCompetitors, rc => Number(rc.match_id) === Number(matchId))
)

const selectMatchPlayers = createSelector(
  selectMatchMatchCompetitors,
  selectPlayers,
  (competitors, players) => {
    return competitors.map(mc => {
      const player = players[mc.player_id] || {}
      player.team = mc.team
      player.match_competitor_id = mc.id
      return player
    })
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
    return orderBy(players, player => -player.results.points)
  }
)

const selectMatchComepetitorOrder = createSelector(
  selectMatchPlayersWithResults,
  players => map(players, player => `${player.match_competitor_id}`)
)

const selectIsMatchTeamBased = createSelector(
  selectMatchMatchCompetitors,
  (matchCompetitors) => some(matchCompetitors, mc => !!mc.team)
)

export {
  selectMatchId,
  selectMatch,
  selectMatchPlayers,
  selectPlayerResults,
  selectMatchPlayersWithResults,
  selectMatchComepetitorOrder,
  selectIsMatchTeamBased
}
