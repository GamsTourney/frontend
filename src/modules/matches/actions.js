import { request } from "../../actions/api"

function fetchMatch(id) {
  return request('matches', `/matches/${id}?include=players,results`)
}

function fetchMatches(tournamentId) {
  return request('matches', `/tournaments/${tournamentId}/matches`)
}

function postScores(id, order) {
  const data = new FormData()
  data.append('order', order)
  return request(
    'matches',
    `/matches/${id}/score`,
    {
      method: 'PATCH',
      body: data
    })
}

export {
  fetchMatch,
  fetchMatches,
  postScores
}
