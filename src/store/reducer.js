import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import login from 'modules/login/dux'
import activeTournament from 'modules/tournaments/dux'
import { buildApiReducer } from 'actions/dux'

const reducer = combineReducers({
  router,
  login,
  activeTournament,
  tournaments: buildApiReducer('tournaments'),
  players: buildApiReducer('players'),
  games: buildApiReducer('games'),
  matches: buildApiReducer('matches'),
  matchCompetitors: buildApiReducer('match_competitors'),
  scores: buildApiReducer('scores')
})

export default reducer
