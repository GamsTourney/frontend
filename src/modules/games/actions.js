import { request } from "../../actions/api"

function fetchGames() {
  return request('games', '/games?include=scores')
}

function fetchMatchesForGame(id) {
  return request('matches', `/games/${id}/matches?include=results`)
}

function fetchGame(id) {
  return request('games', `/games/${id}?include=scores`)
}

export {
  fetchGame,
  fetchGames,
  fetchMatchesForGame
}
