import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/reducers"; 
import userReducer from './redux/reducers/userReducer';
import dashboardReducer from './redux/reducers/dashboardReducer';
import { AUTH_IS_SUCCESS } from './redux/actions/userAction';

// get real redux store
// https://reactjs.org/docs/test-renderer.html
let myApp;
let instance;
beforeEach(() => {
  myApp = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );
  instance = myApp.root;
});

describe('My Connected React-Redux Component', () => {
  test('should render with given default "user" state from Redux store', () => {
    const getUserReducer = store.getState().user;
    const setUserReducer = userReducer(undefined, {});
    console.log(
      "TEST_FIRST_RESULT",
      {
        json: myApp.toJSON(),
        store: getUserReducer
      }
    );
    expect(getUserReducer).toEqual(setUserReducer);
  });

  test('should render with given default "dashboard" state from Redux store', () => {
    const getDashboardReducer = store.getState().dashboard;
    const setDashboardReducer = dashboardReducer(undefined, {});
    expect(getDashboardReducer).toEqual(setDashboardReducer);
  });

  test('should render with given state from Redux store match json snapshot', () => {
    expect(myApp.toJSON()).toMatchSnapshot();
  });

  test('renders <img>',() => {
    const getImage_Element = instance.findByType('img').props.className.includes("App-logo");
    expect(getImage_Element).toBe(true);
  });

  test('renders <p>',() => {
    const getP_Element = instance.findByType('p').children;
    expect(getP_Element).toEqual(['Edit and save to reload.']);
  });

  test('renders learn react link',() => {
    const getA_element = instance.findByProps({className: "App-link"}).children;
    expect(getA_element).toEqual(['Learn React']);
  });

  test('renders <button>',() => {
    const getButton_Element = instance.findByType('button').children;
    expect(getButton_Element).toEqual(['click']);
  });

  it('should dispatch an action on button click "simulate user login"', () => {
    renderer.act(() => {
      instance.findByType('button').props.onClick();
    });
    
    const getUpdateUserReducer = store.getState().user;
    const expectedUserReducerByDispatch = userReducer(undefined, {
      type: AUTH_IS_SUCCESS,
      payload: {
        username: 'dummy'
      }
    });
    const expectedUserReducerByHardcode = { authed: true, data: { username: 'dummy' }}

    console.log(
      "TEST_LAST_RESULT",
      {
        json: myApp.toJSON(),
        store: getUpdateUserReducer
      }
    );
    expect(getUpdateUserReducer).toEqual(expectedUserReducerByDispatch);
    expect(getUpdateUserReducer).toEqual(expectedUserReducerByHardcode);
  })
});
