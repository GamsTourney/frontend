import { request } from "../../actions/api"

function fetchPlayers() {
  return request('players', '/players?include=matches')
}

function fetchPlayer(id) {
  return request('players', `/players/${id}`)
}

export {
  fetchPlayer,
  fetchPlayers
}
