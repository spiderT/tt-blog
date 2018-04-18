export const actionType = {
  CHECK_MESSAGE: 'CHECK_MESSAGE',
}

export const actions = {
  check (value){
    console.log('value', value);
    return dispatch => {
      dispatch({
        type: actionType.CHECK_MESSAGE,
        payload: {
          checked: !value
        }
      })
    }
  }
}