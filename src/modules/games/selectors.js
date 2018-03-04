import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter } from 'lodash/collection'
import {
  selectMatches,
  selectGames
} from 'selectors/collections'

const selectGameId = (state, props) => get(props, 'match.params.id') || props.gameId

const selectGame = createSelector(
  selectGames,
  selectGameId,
  (games, gameId) => games[gameId] || {}
)

const selectMatchesForGame = createSelector(
  selectMatches,
  selectGameId,
  (matches, gameId) => filter(matches, match => `${match.game_id}` === `${gameId}`)
)

export {
  selectGame,
  selectMatchesForGame
}
