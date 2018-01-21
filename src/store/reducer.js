import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import tournaments from 'modules/tournaments/dux'
import players from 'modules/players/dux'

const reducer = combineReducers({
  router,
  tournaments,
  players
})

export default reducer
