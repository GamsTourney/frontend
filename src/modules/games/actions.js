import { request } from "../../actions/api"

function fetchGames() {
  return request('games', '/games')
}

function fetchGame(id) {
  return request('games', `/games/${id}?include=matches`)
}

export {
  fetchGame,
  fetchGames
}
