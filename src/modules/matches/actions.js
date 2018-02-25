import { request } from "../../actions/api"

function fetchMatch(id) {
  return request('matches', `/matches/${id}?include=players,results`)
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
  postScores
}
