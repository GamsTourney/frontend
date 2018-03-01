import { createSelector } from 'reselect'
import { keyBy } from 'lodash/collection'
import { selectPlayers } from 'selectors/collections'

const selectPlayersById = createSelector(
  selectPlayers,
  (players) => keyBy(players, 'id')
)

export {
  selectPlayersById
}
