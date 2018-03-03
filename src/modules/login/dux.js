const initialState = {
  password: '',
}

const SET_PASSWORD = 'login/SET_PASSWORD'

function reduceSetPassword(state = initialState, action) {
  const { password } = action
  return {
    ...state,
    password
  }
}

function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD:
      return reduceSetPassword(state, action)
    default:
      return state
  }
}

export {
  setPassword
}
