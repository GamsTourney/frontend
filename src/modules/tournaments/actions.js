import * as api from 'actions/api'

const tournaments_url = `${api.API_URL}/tournaments`

export function receiveTournaments(json) {
  return { type: api.API_RECIEVE, tournaments: json }
}

export function fetchTournaments() {
  return dispatch => {
    return fetch(tournaments_url, { method: 'GET' })
    .then(resp => resp.json())
    .then(json => dispatch(receiveTournaments(json)))
  }

}
