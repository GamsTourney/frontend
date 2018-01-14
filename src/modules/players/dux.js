import initialState from 'store/initial'
import { API_FETCH, API_RECEIVE } from 'actions/api'

export default function players(state = initialState.players, action) {
  let newState
  switch (action.type) {
    case API_FETCH:
      return action
    case API_RECEIVE:
      newState = action.players || state
      return newState
    default:
      return state
  }
}
