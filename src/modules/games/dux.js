import set from 'lodash/set'

const GROUP_FILTER_CHANGE = 'groups/FILTER_CHANGE'
const GROUP_FILTER_CLEAR = 'groups/FILTER_CLEAR'

function reduceChangeGroupFilter(state = {}, action) {
  const { gameId, groupId, checked } = action
  const dupedState = { ...state }
  set(dupedState, `${gameId}.${groupId}`, checked)
  return dupedState
}

function reduceClearGroupFilter(state, action) {
  return {}
}

export default (state = {}, action) => {
  switch (action.type) {
    case GROUP_FILTER_CHANGE:
      return reduceChangeGroupFilter(state, action)
    case GROUP_FILTER_CLEAR:
      return reduceClearGroupFilter(state, action)
    default:
      return state
  }
}

export {
  GROUP_FILTER_CHANGE,
  GROUP_FILTER_CLEAR
}
