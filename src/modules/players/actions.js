import { request } from "../../actions/api"

function fetchPlayers() {
  return request('players', '/players')
}

function fetchPlayer(id) {
  return request('players', `/players/${id}?include=matches`)
}

export {
  fetchPlayer,
  fetchPlayers
}
