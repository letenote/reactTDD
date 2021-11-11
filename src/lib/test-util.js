import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
// import { reducers } from "../redux/reducers";
import store from "../redux/reducers"; 
import { createMemoryHistory } from 'history'; 
import { Router } from 'react-router-dom'; 
//https://malcolmkee.com/react-testing/testing-redux-and-router/#test-redux-connected-components

export const renderWithStateMgmt = (ui, { actions = [] } = {}) => {
  // const store = configureStore({
  //   reducer: reducers,
  // });

  actions.forEach((action) => store.dispatch(action)); 

  const renderResult = render(
    <Provider store={store}>
      {ui}
    </Provider>
  );

  return {
    ...renderResult,
    store,
  };
};

export const renderWithStateMgmtAndRouter = (ui, { actions = [], route = '/' } = {}) => {
  actions.forEach((action) => store.dispatch(action)); 
  const history = createMemoryHistory({
    initialEntries: [route],
  });
  const renderResult = render(
    <Router history={history}>
      <Provider store={store}>
        {ui}
      </Provider>
    </Router>
  );

  return {
    ...renderResult,
    store,
    history,
  };
};