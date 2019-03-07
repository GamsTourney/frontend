import { request } from "../../actions/api"
import { GROUP_FILTER_CHANGE, GROUP_FILTER_CLEAR } from './dux'

function fetchGames(tournamentId) {
  return request('games', `/tournaments/${tournamentId}/games?include=scores`)
}

function fetchMatchesForGame(tournamentId, id) {
  return request('matches', `/tournaments/${tournamentId}/games/${id}/matches?include=results`)
}

function fetchGame(id) {
  return request('games', `/games/${id}?include=scores`)
}

function fetchGameScores(id) {
  return request('scores', `/games/${id}/scores`)
}

function clearGroupFilter(groupId, checked) {
  return { type: GROUP_FILTER_CLEAR, groupId }
}

function updateGroupFilter(gameId, groupId, checked) {
  return {
    type: GROUP_FILTER_CHANGE,
    gameId,
    groupId,
    checked
  }
}

export {
  fetchGame,
  fetchGames,
  fetchMatchesForGame,
  fetchGameScores,
  clearGroupFilter,
  updateGroupFilter
}
