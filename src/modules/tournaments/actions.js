import { request } from '../../actions/api'
import { TOURNAMENT_CHANGE } from './dux'

function fetchTournaments() {
  return request('tournaments', '/tournaments')
}

function fetchTournament(id) {
  return request('tournaments', `/tournaments/${id}?include=standings,stats`)
}

function changeActiveTournament(tournament) {
  return {
    type: TOURNAMENT_CHANGE,
    tournament
  }
}

export {
  fetchTournaments,
  fetchTournament,
  changeActiveTournament
}
