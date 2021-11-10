import * as USER_ACTION from '../actions/userAction';

const initialState = {
  authed: false,
  data: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION.AUTH_IS_SUCCESS:
      return{
        ...state,
        authed: true,
        data: {
          username: action.payload.username || null
        }
      }
    default:
      return state;
  }
};

export default userReducer;
