import { API_RECEIVE, API_URL } from "../../actions/api"

const tournaments_url = `${API_URL}/tournaments`

function receiveTournaments(json) {
  return { type: API_RECEIVE, tournaments: json }
}

function fetchTournaments() {
  return dispatch => {
    return fetch(tournaments_url, { method: 'GET' })
    .then(resp => resp.json())
    .then(json => dispatch(receiveTournaments(json)))
  }

}

export {
  fetchTournaments
}
