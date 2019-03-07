import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter } from 'lodash/collection'
import {
  selectMatches,
  selectGames,
  selectScores
} from 'selectors/collections'
import { selectTournamentId } from 'modules/tournaments/selectors'
import { orderBy, map } from 'lodash/collection'
import isEmpty from 'lodash/isEmpty'

const selectGameId = (state, props) => get(props, 'match.params.id') || props.gameId

const selectMatchFilter = (state) => state.matchFilter

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

const selectFilteredMatchesForGame = createSelector(
  selectMatchFilter,
  selectGameId,
  selectMatchesForGame,
  (mf, gameId, matches) => {
    const matchFilter = mf[gameId]
    if (isEmpty(matchFilter)) {
      return matches
    }
    return filter(matches, match => matchFilter[match.group_id])
  }
)

const selectGameScores = createSelector(
  selectScores,
  selectGameId,
  (scores, gameId) => filter(scores, score => `${score.game_id}` === `${gameId}`)
)

const selectGameScoreRankList = createSelector(
  selectGameScores,
  (scores) => map(orderBy(scores, 'position'), 'value')
)

export {
  selectFilteredMatchesForGame,
  selectGame,
  selectGamesForTournament,
  selectMatchFilter,
  selectMatchesForGame,
  selectGameScores,
  selectGameScoreRankList
}
