import { combineReducers } from 'redux'
import tournaments from 'modules/tournaments/dux'

const rootReducer = combineReducers({
  tournaments
})

export default rootReducer
