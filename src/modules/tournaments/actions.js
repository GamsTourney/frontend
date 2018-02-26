import { request } from "../../actions/api"

function fetchTournaments() {
  return request('tournaments', '/tournaments')
}

function fetchTournament(id) {
  return request('tournaments', `/tournaments/${id}?include=standings`)
}


export {
  fetchTournaments,
  fetchTournament
}
