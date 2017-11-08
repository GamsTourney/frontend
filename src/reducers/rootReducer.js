import { combineReducers } from 'redux'
import tournaments from './tournamentReducer'

const rootReducer = combineReducers({
  tournaments
})

export default rootReducer
