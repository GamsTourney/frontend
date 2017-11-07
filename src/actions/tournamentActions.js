import * as types from './apiActions'

// TODO: Use environments
const api_url = 'http://localhost:4000'
const tournaments_url = `${api_url}/tournaments`

export function receiveTournaments(json) {
  return { type: types.API_RECIEVE, tournaments: json }
}

export function fetchTournaments() {
  return dispatch => {
    return fetch(tournaments_url, { method: 'GET' })
    .then(resp => resp.json())
    .then(json => dispatch(receiveTournaments(json)))
  }

}
