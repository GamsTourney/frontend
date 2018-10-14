const TOURNAMENT_CHANGE = 'tournament/CHANGE'

function reduceChangeTournament(state = {}, action) {
  const { tournament } = action
  return {
    ...state,
    ...tournament
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case TOURNAMENT_CHANGE:
      return reduceChangeTournament(state, action)
    default:
      return state
  }
}

export {
  TOURNAMENT_CHANGE
}
