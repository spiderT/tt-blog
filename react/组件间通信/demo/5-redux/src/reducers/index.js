import {actionType} from '../actions'

export const initState = {
  checked: false
}

export function reducer(state = initState, action) {
  const {type, payload} = action
  switch (type) {
    case actionType.CHECK_MESSAGE:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}