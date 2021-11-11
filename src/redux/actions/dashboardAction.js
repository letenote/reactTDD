export const ADD_ITEM = 'ADD_ITEM';

export const addItem = ( product, successCB, failedCB ) => dispatch => {
  return dispatch({
    type: ADD_ITEM,
    payload: { 
      product
     },
  });
}