const API_URL = 'https://guts-dev.herokuapp.com'
const API_FETCH = 'API_FETCH'
const API_RECEIVE = 'API_RECEIVE'

function apiRecieve(collection, json) {
  return { type: API_RECEIVE, [collection]: json }
}

function request(collection, url, method = 'GET') {
  return dispatch => {
    return fetch(API_URL + url, { method })
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