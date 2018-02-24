import { request } from "../../actions/api"

function fetchMatch(id) {
  return request('matches', `/matches/${id}?include=players,results`)
}

export {
  fetchMatch
}
