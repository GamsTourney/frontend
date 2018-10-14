import { createSelector } from 'reselect'
import { get } from 'lodash/object'

const selectTournamentId = (state, props) => get(state, 'tournament.id')
