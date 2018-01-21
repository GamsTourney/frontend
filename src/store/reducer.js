import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { buildApiReducer } from 'actions/dux'

const reducer = combineReducers({
  router,
  tournaments: buildApiReducer('tournaments'),
  players: buildApiReducer('players')
})

export default reducer
