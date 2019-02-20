const selectTournaments = state => state.tournaments || {}
const selectPlayers = state => state.players || {}
const selectGames = state => state.games || {}
const selectMatches = state => state.matches || {}
const selectMatchCompetitors = state => state.matchCompetitors || {}

export {
  selectTournaments,
  selectPlayers,
  selectGames,
  selectMatches,
  selectMatchCompetitors
}
