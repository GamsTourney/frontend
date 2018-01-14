import { combineReducers } from 'redux'
import tournaments from 'modules/tournaments/dux'
import players from 'modules/players/dux'

const reducer = combineReducers({
  tournaments,
  players
})

export default reducer
