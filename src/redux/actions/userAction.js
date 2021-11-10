export const AUTH_IS_SUCCESS = 'AUTH_IS_SUCCESS';

export const userLogin = ( data, successCB, failedCB ) => dispatch => {
  return dispatch({
    type: AUTH_IS_SUCCESS,
    payload: { 
      username: data.username,
     },
  });
}