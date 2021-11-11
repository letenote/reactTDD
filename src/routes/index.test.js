import renderer from 'react-test-renderer';
import React from "react";
import App from '../App';
import { Provider } from "react-redux";
import store from "../redux/reducers"; 
import { createMemoryHistory } from "history";
import { Router } from 'react-router-dom'; 
import { renderWithStateMgmt, renderWithStateMgmtAndRouter } from '../lib/test-util';
import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
// https://malcolmkee.com/react-testing/testing-redux-and-router/
describe('My Default Routes Test', () => {
  // let myApp;
  // let expectRoute = '/'
  // const history = createMemoryHistory({
  //   initialEntries: [expectRoute],
  // });
  // beforeEach(() => {
  //   myApp = renderer.create(
  //     <Router history={history}>
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     </Router>
  //   );
  // });
  test('redirects to Home page', () => {
    let expectRoute = '/'
    const { history } = renderWithStateMgmtAndRouter(<Home />, {
      actions : [], route : expectRoute
    });
    expect(history.location.pathname).toBe(expectRoute);
  });

  test('redirects to Dashboard page', () => {
    let expectRoute = '/dashboard'
    const { history } = renderWithStateMgmtAndRouter(<Dashboard />, {
      actions : [], route : expectRoute
    });
    expect(history.location.pathname).toBe(expectRoute);
  });

  test('redirects to nested Dashboard page', () => {
    let expectRoute = '/dashboard/images'
    const { history } = renderWithStateMgmtAndRouter(<Dashboard />, {
      actions : [], route : expectRoute
    });
    expect(history.location.pathname).toBe(expectRoute);
  });

  test('redirects to nested Dashboard page by params', () => {
    let expectRoute = '/dashboard/123987129387'
    const { history } = renderWithStateMgmtAndRouter(<Dashboard />, {
      actions : [], route : expectRoute
    });
    expect(history.location.pathname).toBe(expectRoute);
  });
});