import initialState from 'store/initial'
import { API_FETCH, API_RECEIVE } from 'actions/api'
import { merge } from 'lodash/object'
import { keyBy } from 'lodash/collection'

function buildApiReducer(collection) {
  return (state = initialState[collection], action) => {
    let newState
    switch (action.type) {
      case API_FETCH:
        return action
      case API_RECEIVE:
        if (action[collection]) {
          const data = Array.isArray(action[collection]) ? action[collection] : [action[collection]]
          newState = merge(keyBy(data, 'id'), state)
          return newState
        }
        return state
      default:
        return state
    }
  }
}

export { buildApiReducer }