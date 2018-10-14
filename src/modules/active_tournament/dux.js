const TOURNAMENT_CHANGE = 'tournament/CHANGE'

const initialState = {
  tournament: {},
}

function reduceChangeTournament(state = initialState, action) {
  const { tournament } = action
  return {
    ...state,
    tournament
  }
}

function changeTournament(tournament) {
  return {
    type: TOURNAMENT_CHANGE,
    tournament
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
