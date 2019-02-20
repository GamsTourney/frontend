import { request } from "../../actions/api"

function fetchMatch(id) {
  return request('matches', `/matches/${id}?include=results`)
}

function fetchMatches(tournamentId) {
  return request('matches', `/tournaments/${tournamentId}/matches`)
}

function fetchMatchCompetitors(matchId) {
  return request('match_competitors', `/matches/${matchId}/match_competitors`)
}

function fetchMatchCompetitorsForTournament(tournamentId) {
  return request('match_competitors', `/tournaments/${tournamentId}/match_competitors`)
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
  fetchMatchCompetitors,
  fetchMatchCompetitorsForTournament,
  postScores
}
