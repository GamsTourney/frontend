import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter } from 'lodash/collection'
import {
  selectMatches,
  selectGames
} from 'selectors/collections'
import { selectTournamentId } from 'modules/tournaments/selectors'

const selectGameId = (state, props) => get(props, 'match.params.id') || props.gameId

const selectGame = createSelector(
  selectGames,
  selectGameId,
  (games, gameId) => games[gameId] || {}
)

const selectGamesForTournament = createSelector(
  selectGames,
  selectTournamentId,
  (games, tournamentId) => filter(games, game => `${game.tournament_id}` === `${tournamentId}`)
)

const selectMatchesForGame = createSelector(
  selectMatches,
  selectGameId,
  (matches, gameId) => filter(matches, match => `${match.game_id}` === `${gameId}`)
)

export {
  selectGame,
  selectGamesForTournament,
  selectMatchesForGame
}
