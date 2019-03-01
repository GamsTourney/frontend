import { createSelector } from 'reselect'
import { get } from 'lodash/object'
import { filter, find, orderBy } from 'lodash/collection'
import {
  selectMatches,
  selectMatchCompetitors,
  selectTournaments,
  selectPlayers,
  selectGames
} from 'selectors/collections'

const getGameName = (match, game) => {
  const { team, group_id } = match
  let gameName = game.name
  if (team !== null) {
    gameName += ` (Team ${team + 1})`
  } else if (group_id !== null) {
    gameName += ` (Group ${group_id + 1})`
  }
  return gameName
}

const selectTournamentId = (state, props) =>
  get(props, 'match.params.tournamentId') ||
  get(state, 'activeTournament.id') ||
  get(props, 'tournamentId') ||
  2

const selectTournament = createSelector(
  selectTournaments,
  selectTournamentId,
  (tournaments, tournamentId) => tournaments[tournamentId] || {}
)

const selectTournamentStandings = createSelector(
  selectTournament,
  (tournament) => tournament.standings || []
)

const selectTournamentStats = createSelector(
  selectTournament,
  (tournament) => tournament.stats || {}
)

const selectTournamentStandingsForChart = createSelector(
  selectTournamentStandings,
  selectPlayers,
  (standings, players) => (
    standings.map((standing) => {
      const player = find(players, player => `${player.id}` === `${standing.player}`)
      if (player) {
        const firstName = player.name.split(' ')[0]
        return { name: firstName, score: standing.score }
      }
      return {}
    })
  )
)

const selectTournamentMatches = createSelector(
  selectTournamentId,
  selectMatches,
  (tournamentId, matches) => filter(matches, match => `${match.tournament_id}` === `${tournamentId}`)
)

const selectUpcomingMatches = createSelector(
  selectTournamentMatches,
  (matches) => {
    const unfinished = filter(matches, match => !match.completed && !match.hidden)
    const sorted = orderBy(unfinished, ['start_time'], ['asc'])
    return sorted.slice(0, 6)
  }
)

const selectTournamentMatchesByPlayer = createSelector(
  selectTournamentMatches,
  selectMatchCompetitors,
  (matches, matchCompetitors) => {
    const schedule = {}
    matches.forEach((match) => {
      const competitors = filter(matchCompetitors, mc =>
        `${mc.match_id}` === `${match.id}`
      )
      competitors.forEach((competitor) => {
        const { player_id, team } = competitor
        const playerMatch = { team, ...match }
        if (schedule[player_id]) {
          schedule[player_id].push(playerMatch)
        } else {
          schedule[player_id] = [playerMatch]
        }
      })
    })
    return schedule
  }
)

const selectTimelineData = createSelector(
  selectPlayers,
  selectGames,
  selectTournamentMatchesByPlayer,
  (players, games, playerMatches) => {
    const rows = []
    Object.keys(playerMatches).forEach((playerId) => {
      const player = find(players, player => `${player.id}` === `${playerId}`) || {}
      playerMatches[playerId].forEach((match) => {
        if (!match.hidden) {
          const game = find(games, game => `${game.id}` === `${match.game_id}`) || {}
          const row = [
            player.name,
            getGameName(match, game),
            new Date(match.start_time),
            new Date(match.end_time)
          ]
          rows.push(row)
        }
      })
    })
    return rows
  }
)

const selectProgressData = createSelector(
  selectTournamentMatches,
  (matches) => {
    const matchesCompleted = filter(matches, (match) => match.completed).length
    return {
      matchProgress: (matchesCompleted / matches.length) * 100
    }
  }
)

export {
  selectTournamentId,
  selectTournament,
  selectTournamentStats,
  selectTournamentMatches,
  selectUpcomingMatches,
  selectTournamentMatchesByPlayer,
  selectTimelineData,
  selectTournamentStandingsForChart,
  selectProgressData
}
