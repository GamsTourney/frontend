import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter, find } from 'lodash/collection'
import {
  selectMatches,
  selectTournaments,
  selectPlayers,
  selectGames
} from 'selectors/collections'

const selectTournamentId = (state, props) => get(props, 'match.params.id') || props.tournamentId

const selectTournament = createSelector(
  selectTournaments,
  selectTournamentId,
  (tournaments, tournamentId) => tournaments[tournamentId] || {}
)

const selectTournamentMatches = createSelector(
  selectTournamentId,
  selectMatches,
  (tournamentId, matches) => filter(matches, match => `${match.tournament_id}` === `${tournamentId}`)
)

const selectTournamentMatchesByPlayer = createSelector(
  selectTournamentMatches,
  (matches) => {
    const schedule = {}
    matches.forEach((match) => {
      const { player_ids } = match
      player_ids.forEach((player) => {
        if (schedule[player]) {
          schedule[player].push(match)
        } else {
          schedule[player] = [match]
        }
      })
    })
    return schedule
  }
)

const selectTimelineData = createSelector(
  selectPlayers,
  selectGames,
  selectTournamentMatchesByPlayer,
  (players, games, playerMatches) => {
    const rows = []
    Object.keys(playerMatches).forEach((playerId) => {
      const player = find(players, player => `${player.id}` === `${playerId}`) || {}
      playerMatches[playerId].forEach((match) => {
        if (!match.hidden) {
          const game = find(games, game => `${game.id}` === `${match.game_id}`) || {}
          const row = [
            player.name,
            game.name,
            new Date(match.start_time),
            new Date(match.end_time)
          ]
          rows.push(row)
        }
      })
    })
    return rows
  }
)

export {
  selectTournament,
  selectTournamentMatches,
  selectTournamentMatchesByPlayer,
  selectTimelineData
}
