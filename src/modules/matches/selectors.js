import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter } from 'lodash/collection'
import { selectMatches, selectPlayers } from 'selectors/collections'

const selectMatchId = (state, props) => get(props, 'match.params.id')

const selectMatch = createSelector(
  selectMatches,
  selectMatchId,
  (matches, matchId) => matches[matchId] || {}
)

const selectMatchPlayerIds = createSelector(
  selectMatch,
  (match) => {
    const matchPlayers = match.players || []
    return matchPlayers.map(player => player.id)
  }
)

const selectMatchPlayers = createSelector(
  selectMatch,
  selectPlayers,
  selectMatchPlayerIds,
  (match, players, matchPlayers) => filter(players, (player) => matchPlayers.includes(player.id))
)

export {
  selectMatchId,
  selectMatch,
  selectMatchPlayers
}
