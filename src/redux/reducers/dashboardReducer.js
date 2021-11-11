import * as DASHBOARD_ACTION from '../actions/dashboardAction';

const initialState = {
  theme: "light",
  cart: [
    {
      id: 1,
      price: 200,
    }
  ]
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_ACTION.ADD_ITEM:
      return {
        ...state,
        cart: [ ...state.cart, action.payload.product ]
      }
    default:
      return state;
  }
};

export default dashboardReducer;
