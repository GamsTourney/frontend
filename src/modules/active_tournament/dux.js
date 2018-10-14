const TOURNAMENT_CHANGE = 'tournament/CHANGE'

const initialState = {
  tournamentId: '',
}

function reduceChangeTournament(state = initialState, action) {
  const { tournamentId } = action
  return {
    ...state,
    tournamentId
  }
}

function changeTournament(tournamentId) {
  return {
    type: TOURNAMENT_CHANGE,
    tournamentId
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOURNAMENT_CHANGE:
      return reduceChangeTournament(state, action)
    default:
      return state
  }
}

export {
  changeTournament
}
