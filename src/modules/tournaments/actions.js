import { request } from "../../actions/api"

function fetchTournaments() {
  return request('tournaments', '/tournaments')
}

export {
  fetchTournaments
}
