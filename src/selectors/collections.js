const selectTournaments = state => state.tournaments || {}
const selectPlayers = state => state.players || {}
const selectGames = state => state.games || {}
const selectMatches = state => state.matches || {}

export {
  selectTournaments,
  selectPlayers,
  selectGames,
  selectMatches
}
