import { request } from "../../actions/api"

function fetchPlayers(tournamentId) {
  return request('players', `/tournaments/${tournamentId}/players`)
}

function fetchPlayer(id) {
  return request('players', `/players/${id}?include=matches`)
}

export {
  fetchPlayer,
  fetchPlayers
}
