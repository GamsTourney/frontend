import { API_RECEIVE, API_URL } from "../../actions/api"

const players_url = `${API_URL}/players`

function receivePlayers(json) {
  return { type: API_RECEIVE, players: json }
}

function fetchPlayers() {
  return dispatch => {
    return fetch(players_url, { method: 'GET' })
    .then(resp => resp.json())
    .then(json => dispatch(receivePlayers(json)))
  }

}

export {
  fetchPlayers
}
