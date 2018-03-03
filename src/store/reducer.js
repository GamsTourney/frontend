import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import login from 'modules/login/dux'
import { buildApiReducer } from 'actions/dux'

const reducer = combineReducers({
  router,
  tournaments: buildApiReducer('tournaments'),
  players: buildApiReducer('players'),
  games: buildApiReducer('games'),
  matches: buildApiReducer('matches'),
  login
})

export default reducer
