import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import login from 'modules/login/dux'
import tournament from 'modules/active_tournament/dux'
import { buildApiReducer } from 'actions/dux'

const reducer = combineReducers({
  router,
  login,
  tournament,
  tournaments: buildApiReducer('tournaments'),
  players: buildApiReducer('players'),
  games: buildApiReducer('games'),
  matches: buildApiReducer('matches')
})

export default reducer
