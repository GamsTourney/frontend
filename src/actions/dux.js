import initialState from 'store/initial'
import { API_FETCH, API_RECEIVE } from 'actions/api'
import { merge } from 'lodash/object'
import { keyBy } from 'lodash/collection'

function extractData(data) {
  const objects = Array.isArray(data) ? data : [data]
  const extracted = objects.map((obj) => {
    Object.keys(obj.included).forEach((include) => {
      obj[include] = obj.included[include]
    })
    delete obj.included
    return obj
  })
  return keyBy(extracted, 'id')
}

function buildApiReducer(collection) {
  return (state = initialState[collection], action) => {
    let newState
    switch (action.type) {
      case API_FETCH:
        return action
      case API_RECEIVE:
        if (action[collection]) {
          newState = merge(extractData(action[collection]), state)
          return newState
        }
        return state
      default:
        return state
    }
  }
}

export { buildApiReducer }
