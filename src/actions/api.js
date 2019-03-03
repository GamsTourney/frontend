const API_URL = process.env.API_URL || 'https://guts-dev.herokuapp.com'
const API_FETCH = 'API_FETCH'
const API_RECEIVE = 'API_RECEIVE'

function apiRecieve(collection, json) {
  return { type: API_RECEIVE, [collection]: json }
}

function request(collection, url, options) {
  return dispatch => {
    return fetch(API_URL + url, options)
      .then(resp => resp.json())
      .then(json => dispatch(apiRecieve(collection, json)))
  }
}

export {
  API_URL,
  API_FETCH,
  API_RECEIVE,
  request
}
